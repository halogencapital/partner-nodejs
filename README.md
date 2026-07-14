# Halogen Partner

Package partner-nodejs is a nodejs client for calling the Halogen Partner HTTP API.

### Installation

You may install the package using `npm`.

```bash
$ npm add github:halogencapital/partner-nodejs
```

### Documentation:

Checkout https://developer.halogen.my/partner

### Quick start

1. Login to https://partner.halogen.my.

2. Navigate to **Settings > API Keys**.

3. Create a new API key by providing a Certificate Signing Request (CSR). Elliptic Curve P-256 (recommended) and RSA-4096 are supported.
    - Generate new EC P-256 CSR using OpenSSL.
        ```bash
        mkdir -p .key
        openssl ecparam -name prime256v1 -genkey -noout -out .key/ec_private_key.pem
        openssl req -new -key .key/ec_private_key.pem -out .key/ec_csr.pem -sha256 -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=example.com"
        ```
    - Or generate new RSA-4096 CSR using OpenSSL.
        ```bash
        mkdir -p .key
        openssl req -new -newkey rsa:4096 -nodes -keyout .key/rsa_private_key.pem -out .key/rsa_csr.pem -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=example.com"
        ```
    - Keep the generated **Private Key** in a secure storage and never share it with any party. This package will use the **Private Key** to sign the requests before it is sent to Halogen Partner server.
4. Save the Key ID and use it in the client as following:
    ```js
    const privateKeyPEM = loadPrivateKeyFromSecretStorage()
    const client = new partner.HttpClient({
        // endpoint should be set to the UAT endpoint.
        endpoint: "https://external-api.partner.uat.halogen.meme",
        // refer to partner portal to get the keyId after creating API key.
        keyId: "86a6b6c31b9140475ab12a21b33fe3095f6ffe90",
        privateKeyPEM,
        debug: true,
    });
    ```

### Rolling out your own client

Checkout [OpenAPI 3.0 specifications](https://developer.halogen.my/partner).

### Local development

When running Halogen Partner backend locally, make sure to tell node where the CA root certificate sits by setting an environment variable.

```bash
export NODE_EXTRA_CA_CERTS="/home/user/rootCA.pem"
```

In case of using mkcert to generate local certificates, you may run the following command to learn about the CAROOT path.

```bash
$ mkcert -CAROOT
```

