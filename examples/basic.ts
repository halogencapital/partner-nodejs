import partner from "../src";


const privateKeyPEM = `-----BEGIN EC PRIVATE KEY-----
YOUR PRIVATE KEY GOES HERE
-----END EC PRIVATE KEY-----`

const client = new partner.HttpClient({
    // endpoint should be set to the UAT endpoint.
    endpoint: "https://external-api.partner.uat.halogen.meme", 
    // refer to partner portal to get the keyId after creating API key.
    keyId: "86a6b6c31b9140475ab12a21b33fe3095f6ffe90", 
    privateKeyPEM,
});

try {
    // list avaialble portfolios
    console.log("> List portfolios")
    const portfoliosOutput = await client.listPortfolios({})
    console.dir(portfoliosOutput, {depth: null});

    const chosenPortfolio = portfoliosOutput.portfolios[0]
    
    // create client
    console.log("> Create individual client")
    const clientOutput = await client.createIndividualClient({
        name: "Satoshi",
        nationality: "malaysia",
        nricNo: "XXXXXX-XX-XXXX",
        msisdn: "+6011XXXXXXXX",
        email: "satoshi@halogen.my",
        employmentType: "employed",
        designation: "engineer",
        companyName: "Bitcoin",
        natureOfBusiness: "nb99",
        otherNatureOfBusiness: "other nature",
        annualIncome: "rm40torm119k",
        sourceOfWealth: ["employment"],
        investorCategory: "highNetworthInvestor",
        applicantIsPep: "no",
        permanentAddressLine1: "permanentAddressLine1",
        permanentAddressPostcode: "permanentAddressPostcode",
        permanentAddressCity: "permanentAddressCity",
        permanentAddressState: "permanentAddressState",
        permanentAddressCountry: "permanentAddressCountry",
        correspondenceAddressLine1: "correspondenceAddressLine1",
        correspondenceAddressPostcode: "correspondenceAddressPostcode",
        correspondenceAddressCity: "correspondenceAddressCity",
        correspondenceAddressState: "correspondenceAddressState",
        correspondenceAddressCountry: "correspondenceAddressCountry",
        applicantInRelationWithPep: "no",
        usPerson: "no",
        suitabilityAssessment: {
            investmentExperience: "basic",
            investmentObjective: "income",
            investmentHorizon: "lessThan1Year",
            currentInvestment: "cashFixedDeposits",
            returnExpectations: "08040",
        },
    })
    console.dir(clientOutput, {depth: null});

    const clientId = clientOutput.clientId
    
    // create account
    console.log("> Create account")
    const accountOutput = await client.createAccount({
        clientId,
        name: chosenPortfolio.name,
        code: chosenPortfolio.code,
    })
    console.dir(accountOutput, {depth: null});

    const accountId = accountOutput.accountId
    
    // list duitnow banks
    console.log("> List duitnow banks")
    const banksOutput = await client.listDuitnowBanks({
        clientId,
        accountId,
    })
    const duitnowBankCode = banksOutput.banks[0].code
    
    // list deposit consents
    console.log("> List deposit consents")
    const consentsOutput = await client.listDepositConsents({
        clientId,
        accountId,
    })
    console.dir(consentsOutput, { depth: null })
    
    // create deposit request with duitnow bank code
    console.log("> Create deposit request with duitnow")
    const depositRequest = await client.createDepositRequest({
        clientId,
        accountId,
        amount: 1000,
        consents: {
            "consentClientAgreement": true,
            "consentSuitabilityRemainUnchanged": true,
            "consentVulnerablePersonDefinition": true
        },
        duitnowBankCode,
    })
    console.dir(depositRequest, {depth: null})

    console.log("> List client account requests")
    const requestsOutput = await client.listClientAccountPortfolioRequests({
        clientId,
        accountId,
        pollForCompletedPayment: false,
    })
    console.dir(requestsOutput, { depth: null })

} catch(err: unknown) {
    if (err instanceof partner.Error) {
        console.error("error: ", err.statusCode, err.api, err.code, err.message, JSON.stringify(err.input));
    } else {
        console.log("Unrecognised error", err);
    }
}

