import { randomBytes, createSign, createHash, KeyObject, createPrivateKey } from 'node:crypto'
import { Partner } from './client.gen'
import { performance } from 'node:perf_hooks'


export default class Signer {
    protected endpoint: string
    protected keyId: string
    protected privateKey: KeyObject
    protected jwtTtlSeconds: number
    protected timeoutMilliseconds: number
    protected debug: boolean

    constructor(keyId: string, privateKeyPEM: string, endpoint: string = "https://external-api.partner.halogen.my", jwtTtlSeconds: number = 30, timeoutMilliseconds: number = 5000, debug: boolean = false) {
        this.endpoint = endpoint
        this.keyId = keyId
        try {
            this.privateKey = createPrivateKey(privateKeyPEM)
        } catch {
            throw new Error("Private key must be either EC-256 or RSA-4096 in PEM format. Refer to https://developer.halogen.my for more information.")
        }
        this.jwtTtlSeconds = jwtTtlSeconds
        this.timeoutMilliseconds = timeoutMilliseconds
        this.debug = debug
        if (this.privateKey.asymmetricKeyType !== "ec" && this.privateKey.asymmetricKeyType !== "rsa") {
            throw new Error("Private key must be either EC-256 or RSA-4096 in PEM format. Refer to https://developer.halogen.my for more information.")
        }
        if (this.privateKey.asymmetricKeyType === "ec" && this.privateKey.asymmetricKeyDetails?.namedCurve !== "prime256v1") {
            throw new Error("EC private key must be on prime256v1 curve. Refer to https://developer.halogen.my for more information.")
        }
        if (this.privateKey.asymmetricKeyType === "rsa" && this.privateKey.asymmetricKeyDetails?.modulusLength !== 4096) {
            throw new Error("RSA private key must be 4096 in bit length. Refer to https://developer.halogen.my for more information.")
        }
        if (this.debug) {
            console.group("DEBUG: Halogen Partner: Initialized HTTP client with the following options:")
            console.dir({
                endpoint: this.endpoint,
                keyId: this.keyId,
                privateKey: this.privateKey,
                jwtTtlSeconds: this.jwtTtlSeconds,
                timeoutMilliseconds: this.timeoutMilliseconds,
                debug: this.debug,
            })
            console.groupEnd()
        }
    }

    protected sign(path: string, body: string): string {
        const header = {
            alg: this.privateKey.asymmetricKeyType === "ec" ? "ES256" : "RS256",
            typ: "JWT"
        }
        const issuedAt = Math.floor(Date.now() / 1000)
        const payload = {
            kid: this.keyId,
            uri: path,
            sub: "partner",
            iat: issuedAt,
            exp: issuedAt + this.jwtTtlSeconds,
            bodyHash: createHash("SHA256").update(body).digest("hex"),
            nonce: randomBytes(20).toString("hex"),
        }
        const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url")
        const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")
        const signingString = encodedHeader + "." + encodedPayload
        const signer = createSign("SHA256").update(signingString).end()
        const signature = signer.sign(this.privateKey).toString('base64url')
        return signingString + "." + signature
    }
    
    protected async query<Input, Output>(name: string, input: Input): Promise<Output> {
        const ep = this.endpoint + "/query"
        const body = JSON.stringify({
            name,
            payload: input
        })
        const token = this.sign("/query", body)
        const maxRetryCount = 5
        let retryCount = 0
        let err5XX: Partner.Error = new Partner.Error(this.endpoint, "query", "", input, 0, "", "")
        for (retryCount = 0; retryCount < maxRetryCount; retryCount++) {
            const request = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body,
                signal: AbortSignal.timeout(this.timeoutMilliseconds),
            }
            let response: Response
            if (!this.debug) {
                response = await fetch(ep, request)
            } else {
                console.group(`DEBUG: Halogen Partner: Sending HTTP request to ${ep} ${name}`)
                console.dir(request)
                const startTime = performance.now()
                response = await fetch(ep, request)
                const endTime = performance.now()
                const duration = endTime - startTime
                console.log(`query ${name} latency: ${duration.toFixed(2)} milliseconds`)
                console.log(`DEBUG: Halogen Partner: Received HTTP response from ${ep} ${name}`)
                console.dir(response)
                console.groupEnd()
            }
            if (response.ok) {
                return (response.json() as Promise<Output>)
            }
            if (response.status >= 400 && response.status < 500) {
                // don't retry 4XX responses
                const body = await response.json()
                throw new Partner.Error(this.endpoint, "query", name, input, response.status, body.code, body.message)
            }
            if (response.status >= 500) {
                // retry 5XX responses
                try {
                    const body = await response.json()
                    err5XX = new Partner.Error(this.endpoint, "query", name, input, response.status, body.code, body.message)
                    await new Promise<void>((r) => setTimeout(r, 100))
                } catch (err) {
                    // server returned invalid JSON in the body
                    err5XX = new Partner.Error(this.endpoint, "query", name, input, response.status, "", "", err)
                    await new Promise<void>((r) => setTimeout(r, 100))
                }
            }
        }
        if (err5XX.statusCode === 0) {
            throw Error
        }
        throw err5XX
    }
    
    protected async command<Input, Output>(name: string, input: Input, options?: { idempotencyKey?: string }): Promise<Output> {
        const ep = this.endpoint + "/command"
        const body = JSON.stringify({
            name,
            payload: input
        })
        const token = this.sign("/command", body)
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                ...(options?.idempotencyKey && { "Idempotency-Key": options.idempotencyKey }),
            },
            body,
        }
        let response: Response
        if (!this.debug) {
            response = await fetch(ep, request)
        } else {
            console.group(`DEBUG: Halogen Partner: Sending HTTP request to ${ep} ${name}`)
            console.dir(request)
            const startTime = performance.now()
            response = await fetch(ep, request)
            const endTime = performance.now()
            const duration = endTime - startTime
            console.log(`command ${name} latency: ${duration.toFixed(2)} milliseconds`)
            console.log(`DEBUG: Halogen Partner: Received HTTP response from ${ep} ${name}`)
            console.dir(response)
            console.groupEnd()
        }
        if (response.ok) {
            return (response.json() as Promise<Output>)
        }
        if (response.status >= 400 && response.status < 500) {
            const body = await response.json()
            throw new Partner.Error(this.endpoint, "command", name, input, response.status, body.code, body.message)
        }
        if (response.status >= 500) {
            let body: any
            try {
                body = await response.json()
            } catch (err) {
                // server returned invalid JSON in the body
                throw new Partner.Error(this.endpoint, "command", name, input, response.status, "", "", err)
            }
            throw new Partner.Error(this.endpoint, "command", name, input, response.status, body.code, body.message)
        }
        throw Error
    }
}
