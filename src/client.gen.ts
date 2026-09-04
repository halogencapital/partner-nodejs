import Signer from "./signer"

let NodeError = Error

export namespace Partner {
	export class Error extends NodeError {
		/** 
		 * The endpoint of which the client requested, and the error returned from.
		 * 
		 * Set to the Partner.Error object for logging convenience.
		*/
		endpoint: string
		/** 
		 * The method of which the client requested, and the error returned from.
		 * 
		 * Set to the Partner.Error object for logging convenience.
		*/
		method: "query" | "command"
		/** 
		 * The API of which the client requested, and the error returned from.
		 * 
		 * Set to the Partner.Error object for logging convenience.
		*/
		api: string
		/** 
		 * The API input of which the client requested, and the error returned from.
		 * 
		 * Set to the Partner.Error object for logging convenience.
		*/
		input: any
		/** 
		 * The statusCode is the native HTTP status code returned from the server.
		*/
		statusCode: number
		/** 
		 * The code is the custom error code returned from the server.
		 * 
		 * Use this attribute to handle errors in different ways.
		*/
		code: string
		/** 
		 * The message is the custom error message returned from the server.
		*/
		message: string
		/** 
		 * The cause is an optional attribute set when there is root cause for this error.
		 */
		cause?: unknown

		constructor(endpoint: string, method: "query" | "command", api: string, input: any, statusCode: number, code: string, message: string, cause?: unknown) {
			super(message)
			this.endpoint = endpoint
			this.method = method
			this.api = api
			this.input = input
			this.statusCode = statusCode
			this.code = code
			this.message = message
			this.cause = cause
		}
	}
	/** Allocation represents an asset allocation within a portfolio. */
	export interface Allocation {
		/** ID is the ID of the asset. */
		id: string
		/** Name is the name of the asset. */
		name: string
		/** ShortName is the abbreviated name of the asset. */
		shortName: string
		/** Code is the code of the asset. */
		code: string
		/** Type is the asset type. */
		type: string
		/** ExposurePercentage is the current exposure percentage of the asset. */
		exposurePercentage: number
		/** TargetExposurePercentage is the target exposure percentage of the asset. */
		targetExposurePercentage: number
		/** FundClassSequence is the display sequence of the fund class. */
		fundClassSequence: number
		/** FundClassLabel is the display label of the fund class. */
		fundClassLabel: string
		/** CanDistribute reports whether the asset can be distributed. */
		canDistribute: boolean
		/** DistributedAmount is the amount distributed from the asset. */
		distributedAmount: number
		/** NetInflow is the net inflow amount of the asset. */
		netInflow: number
		/** PnlAmount is the profit or loss amount of the asset. */
		pnlAmount: number
		/** PnlPercentage is the profit or loss percentage of the asset. */
		pnlPercentage: number
		/** QuoteAsset is the quote asset used for valuation. */
		quoteAsset: string
		/** TotalInflow is the total inflow amount of the asset. */
		totalInflow: number
		/** TotalOutflow is the total outflow amount of the asset. */
		totalOutflow: number
		/** TotalRebate is the total rebate amount received for the asset. */
		totalRebate: number
		/** TotalDividendReinvested is the total dividend amount reinvested into the asset. */
		totalDividendReinvested: number
		/** Units is the number of units held. */
		units: number
		/** UnitPrice is the current unit price of the asset. */
		unitPrice: number
		/** Value is the current value of the asset. */
		value: number
		/** ValuationDate is the date of the asset valuation. */
		valuationDate: string
		/** TotalBuy is the total amount bought. */
		totalBuy: number
		/** TotalSell is the total amount sold. */
		totalSell: number
		/** TotalDeposit is the total deposit amount. */
		totalDeposit: number
		/** TotalWithdrawal is the total withdrawal amount. */
		totalWithdrawal: number
		/** TotalFees is the total fee amount charged. */
		totalFees: number
		/** MinimumExposurePercentage is the minimum allowed exposure percentage of the asset. */
		minimumExposurePercentage: number
		/** Group is the group or category of the asset. */
		group: string
		/** Class is the class of the asset. */
		class: string
		/** HexColor is the color used to represent the asset. */
		hexColor: string
		/** ImageUrl is the URL of the asset image. */
		imageUrl: string
		/** IsFiat reports whether the asset is a fiat currency. */
		isFiat: boolean
		/** Title is the primary display title of the asset. */
		title: string
		/** Subtitle is the secondary display text of the asset. */
		subtitle: string
		/** ShariahCompliant reports whether the asset is Shariah-compliant. */
		shariahCompliant: boolean
		/** Objective describes the investment objective of the asset. */
		objective: string
		/** FundProvider is the provider or manager of the fund. */
		fundProvider: string
		/** ListingDate is the date the asset was listed or made available. */
		listingDate: string
		/** ExternalURL is the URL to the asset's external page or document. */
		externalURl: string
	}

	/** BankAccount represents a client's registered bank account. */
	export interface BankAccount {
		/** ClientAccountID is the ID of the client account associated with the bank account. */
		clientAccountId: string
		/** AccountNumber is the bank account number. */
		accountNumber: string
		/** AccountName is the bank account holder name. */
		accountName: string
		/** AccountCurrency is the currency of the bank account. */
		accountCurrency: string
		/** AccountType is the type of bank account. */
		accountType: string
		/** BankName is the display name of the bank. */
		bankName: string
		/** BankBic is the bank BIC code. */
		bankBic: string
		/** ReferenceNumber is the reference number associated with the bank account. */
		referenceNumber: string
		/** ImageUrl is the URL of the bank logo or image. */
		imageUrl: string
		/** Status is the current status of the bank account. */
		status: string
		/** Source indicates where the bank account was created from. */
		source: string
		/** CreatedAt is the timestamp when the bank account was created. */
		createdAt: string
		/** CreatedBy is the email address or identifier of the user who created the bank account. */
		createdBy: string
		/** NoteHTML contains additional bank account notes formatted as HTML. */
		noteHTMl: string
	}

	/** Client represents a client referred by the MR client. */
	export interface Client {
		/** ID is the ID of the client. */
		id: string
		/** Name is the name of the client. */
		name: string
		/** Email is the email address of the client. */
		email?: string
		/** Msisdn is the phone number of the client. */
		msisdn?: string
		/** AuthorisedPersonName is the name of the client's authorised person. */
		authorisedPersonName?: string
		/** AuthorisedPersonEmail is the email address of the client's authorised person. */
		authorisedPersonEmail?: string
		/** AuthorisedPersonMsisdn is the phone number of the client's authorised person. */
		authorisedPersonMsisdn?: string
		/** InvestorCategory is the investor category of the client. */
		investorCategory: string
		/** Type is the client type. */
		type: string
		/** ReferredBy is the referral code associated with the client. */
		referredBy: string
		/** Status is the current status of the client. */
		status: string
		/** CreatedAt is the date and time the client was created. */
		createdAt: string
	}

	/** ClientAccount represents an account belonging to a client. */
	export interface ClientAccount {
		/** ID is the ID of the account. */
		id: string
		/** Type is the account type. */
		type: string
		/** Name is the name of the account. */
		name: string
		/** Label is the display label of the account. */
		label: string
		/** Experience is the investment experience of the account. */
		experience: string
		/** ExperienceLabel is the display label of the account experience. */
		experienceLabel: string
		/** Asset is the account's base asset. */
		asset: string
		/** Status is the current status of the account. */
		status: string
		/** PortfolioValue is the current portfolio value of the account. */
		portfolioValue: number
		/** ExposurePercentage is the account's exposure percentage. */
		exposurePercentage: number
		/** PnlAmount is the account's profit or loss amount. */
		pnlAmount: number
		/** PnlPercentage is the account's profit or loss percentage. */
		pnlPercentage: number
		/** NetInflow is the net amount of funds flowing into the account. */
		netInflow: number
		/** TotalInflow is the total amount of funds flowing into the account. */
		totalInflow: number
		/** TotalOutflow is the total amount of funds flowing out of the account. */
		totalOutflow: number
		/** PendingSwitchInAmount is the amount pending to be switched into the account. */
		pendingSwitchInAmount: number
		/** PermissionOptions contains the permissions available for the account. */
		permissionOptions: PermissionOption[]
	}

	/** ClientAccountPerformance represents a single performance
	 * data point for a client portfolio account at a specific date.
	 */
	export interface ClientAccountPerformance {
		/** Date is the valuation date of the performance data point in YYYY-MM-DD format. */
		date: string
		/** IsInceptionDate reports whether the data point represents the account's inception date. */
		isInceptionDate: boolean
		/** AccountID is the unique identifier of the portfolio account. */
		accountId: string
		/** Value is the portfolio value of the account on the given date, expressed in the client's display currency. */
		value: number
	}

	/** ClientAccountPortfolioRequest represents a portfolio transaction request. */
	export interface ClientAccountPortfolioRequest {
		/** ID is the ID of the portfolio request. */
		id: string
		/** Type is the portfolio request type.
		 * Must be one of "deposit", "withdraw", "buy", or "sell".
		 */
		type: string
		/** BaseAsset is the base asset of the request. */
		baseAsset: string
		/** BaseAmount is the amount of the base asset. */
		baseAmount?: number
		/** QuoteAsset is the quote asset of the request. */
		quoteAsset: string
		/** QuoteAmount is the amount of the quote asset. */
		quoteAmount?: number
		/** RequestedAmount is the amount originally requested. */
		requestedAmount?: number
		/** FeePercentage is the fee percentage applied to the request. */
		feePercentage: number
		/** FeeAmount is the fee amount charged for the request. */
		feeAmount: number
		/** PostFeeAmount is the amount after fees are applied. */
		postFeeAmount: number
		/** CollectionBankAccount is the bank account used to collect funds for the request. */
		collectionBankAccount?: BankAccount
		/** IllustrationLabel is the display label for the request. */
		illustrationLabel: string
		/** UnitPrice is the unit price associated with the request. */
		unitPrice: number
		/** Status is the current status of the request. */
		status: string
		/** StatusDescription is the description of the request status. */
		statusDescription: string
		/** CanCancel reports whether the request can be cancelled. */
		canCancel: boolean
		/** HasConfirmationStatement reports whether a confirmation statement is available. */
		hasConfirmationStatement: boolean
		/** CreatedAt is the date and time the request was created. */
		createdAt: string
		/** NavDate is the NAV date associated with the request. */
		navDate?: string
		/** SettlementDate is the settlement date of the request. */
		settlementDate?: string
		/** ToBankBic is the BIC of the destination bank. */
		toBankBic?: string
		/** ToBankAccountName is the name of the destination bank account. */
		toBankAccountName?: string
		/** ToBankAccountNumber is the destination bank account number. */
		toBankAccountNumber?: string
		/** VoucherCode is the voucher code applied to the request. */
		voucherCode?: string
	}

	/** Consent represents a consent item required for a client request. */
	export interface Consent {
		/** Name is the consent identifier. */
		name: string
		/** Label is the display label of the consent. */
		label: string
	}

	/** CreateAccountInput is the input for creating a new client account. */
	export interface CreateAccountInput {
		/** ClientID is the ID of the client for whom the account is being created.
		 *
		 * Required.
		 */
		clientId: string
		/** Name is the display name of the account.
		 *
		 * Required.
		 */
		name: string
		/** Assets is the list of portfolio assets. */
		assets?: PortfolioAsset[]
		/** Code is the code for the portfolio. */
		code?: string
	}

	/** CreateAccountOutput is the response after creating a client account. */
	export interface CreateAccountOutput {
		/** AccountID is the newly created account ID. */
		accountId: string
	}

	/** CreateClientBankAccountsInput is the input for creating client bank accounts. */
	export interface CreateClientBankAccountsInput {
		/** ClientID is the ID of the client who owns the bank accounts.
		 *
		 * Required.
		 */
		clientId: string
		/** BankAccounts is the list of bank accounts to register.
		 *
		 * Required.
		 */
		bankAccounts: BankAccount[]
	}

	/** CreateClientBankAccountsOutput is the response after creating client bank accounts. */
	export interface CreateClientBankAccountsOutput {
	}

	/** CreateClientDocumentFromUrlInput is the input for creating
	 * client onboarding documents by downloading files from one-time links.
	 *
	 * Malaysian clients must provide both FrontNricUrl and BackNricUrl.
	 * Non-Malaysian clients must provide PassportUrl.
	 */
	export interface CreateClientDocumentFromUrlInput {
		/** ClientID is the ID of the client who owns the onboarding documents.
		 *
		 * Required.
		 */
		clientId: string
		/** FrontNricUrl is the one-time download URL for the front side of the client's NRIC.
		 *
		 * [conditional] Required only if the client's nationality is "malaysia".
		 */
		frontNricUrl?: string
		/** BackNricUrl is the one-time download URL for the back side of the client's NRIC.
		 *
		 * [conditional] Required only if the client's nationality is "malaysia".
		 */
		backNricUrl?: string
		/** PassportUrl is the one-time download URL for the client's passport document.
		 *
		 * [conditional] Required only if the client's nationality is not "malaysia".
		 */
		passportUrl?: string
		/** SelfieUrl is the one-time download URL for the client's selfie image.
		 *
		 * Required.
		 */
		selfieUrl: string
	}

	/** CreateClientDocumentFromUrlOutput is the response after
	 * successfully creating client onboarding documents from one-time links.
	 */
	export interface CreateClientDocumentFromUrlOutput {
	}

	/** CreateDepositRequestInput is the input for creating a portfolio deposit request. */
	export interface CreateDepositRequestInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
		/** Amount is the deposit amount.
		 *
		 * Required. Must be greater than 0.
		 */
		amount: number
		/** Consents contains client consent flags for the request. */
		consents: Record<string, boolean>
		/** DuitnowBankCode is the DuitNow bank code used for the deposit payment. */
		duitnowBankCode: string
	}

	/** CreateDepositRequestOutput is the response after creating a portfolio deposit request. */
	export interface CreateDepositRequestOutput {
		/** RequestID is the newly created request ID. */
		requestId: string
		/** DuitnowPaymentUrl is the redirect URL for completing the DuitNow payment. */
		duitnowPaymentUrl: string
	}

	/** CreateDuitnowPaymentInput is the input for creating a DuitNow payment. */
	export interface CreateDuitnowPaymentInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
		/** RequestID is the ID of the deposit request to pay for.
		 *
		 * Required.
		 */
		requestId: string
		/** BankCode is the DuitNow bank code.
		 *
		 * Required.
		 */
		bankCode: string
	}

	/** CreateDuitnowPaymentOutput contains the DuitNow payment redirect URL. */
	export interface CreateDuitnowPaymentOutput {
		/** ReferenceID is the reference ID used to identify the DuitNow payment. */
		referenceId: string
		/** Url is the redirect URL for completing the DuitNow payment. */
		url: string
	}

	/** CreateIndividualClientInput is the input for creating an individual client. */
	export interface CreateIndividualClientInput {
		/** Name is the full name of the client as stated in official documents.
		 *
		 * Required.
		 */
		name: string
		/** Email is the email address of the client.
		 *
		 * Required.
		 */
		email: string
		/** Msisdn is the phone number of the client.
		 *
		 * Required.
		 */
		msisdn: string
		/** NricNo is the Malaysian NRIC number of the client.
		 *
		 * [conditional] Required only if the client's nationality is "malaysia".
		 */
		nricNo?: string
		/** PassportNo is the passport number of the client.
		 *
		 * [conditional] Required only if the client's nationality is not "malaysia".
		 */
		passportNo?: string
		/** Nationality is the nationality of the client.
		 *
		 * Required.
		 */
		nationality: string
		/** DateOfBirth is the date of birth of the client.
		 *
		 * [conditional] Required only if the client's nationality is not "malaysia".
		 */
		dateOfBirth?: string
		/** Gender is the gender of the client.
		 *
		 * [conditional] Required only if the client's nationality is not "malaysia".
		 */
		gender?: string
		/** PermanentAddressLine1 is the first line of the client's permanent address.
		 *
		 * Required.
		 */
		permanentAddressLine1: string
		/** PermanentAddressLine2 is the second line of the client's permanent address. */
		permanentAddressLine2?: string
		/** PermanentAddressPostcode is the postcode of the client's permanent address.
		 *
		 * Required.
		 */
		permanentAddressPostcode: string
		/** PermanentAddressCity is the city of the client's permanent address.
		 *
		 * Required.
		 */
		permanentAddressCity: string
		/** PermanentAddressState is the state of the client's permanent address.
		 *
		 * Required.
		 */
		permanentAddressState: string
		/** PermanentAddressCountry is the country of the client's permanent address.
		 *
		 * Required.
		 */
		permanentAddressCountry: string
		/** CorrespondenceAddressLine1 is the first line of the client's correspondence address.
		 *
		 * Required.
		 */
		correspondenceAddressLine1: string
		/** CorrespondenceAddressLine2 is the second line of the client's correspondence address. */
		correspondenceAddressLine2?: string
		/** CorrespondenceAddressPostcode is the postcode of the client's correspondence address.
		 *
		 * Required.
		 */
		correspondenceAddressPostcode: string
		/** CorrespondenceAddressCity is the city of the client's correspondence address.
		 *
		 * Required.
		 */
		correspondenceAddressCity: string
		/** CorrespondenceAddressState is the state of the client's correspondence address.
		 *
		 * Required.
		 */
		correspondenceAddressState: string
		/** CorrespondenceAddressCountry is the country of the client's correspondence address.
		 *
		 * Required.
		 */
		correspondenceAddressCountry: string
		/** EmploymentType specifies the client's employment type.
		 *
		 * Required.
		 */
		employmentType: string
		/** CompanyName is the client's company name.
		 *
		 * [conditional] Required for all employment types except "housewife" and "student".
		 */
		companyName?: string
		/** Designation is the client's job designation.
		 *
		 * [conditional] Required for all employment types except "housewife" and "student".
		 */
		designation?: string
		/** NatureOfBusiness specifies the nature of the client's business.
		 *
		 * [conditional] Required for all employment types except "housewife" and "student".
		 */
		natureOfBusiness?: string
		/** OtherNatureOfBusiness specifies the nature of business when
		 * NatureOfBusiness is "other".
		 *
		 * [conditional] Required only if NatureOfBusiness is "other".
		 */
		otherNatureOfBusiness?: string
		/** SourceOfWealth specifies the client's sources of wealth.
		 *
		 * Required.
		 */
		sourceOfWealth: string[]
		/** OtherSourceOfWealth specifies the source of wealth when SourceOfWealth
		 * contains "other".
		 *
		 * [conditional] Required only if SourceOfWealth contains "other".
		 */
		otherSourceOfWealth?: string
		/** AnnualIncome specifies the client's annual income range.
		 *
		 * [conditional] Required for all employment types except "housewife" and "student".
		 */
		annualIncome?: string
		/** PurposeOfInvestment specifies the client's purpose for making the investment. */
		purposeOfInvestment?: string
		/** ApplicantIsPep specifies whether the applicant is a politically exposed person.
		 *
		 * Required.
		 */
		applicantIsPep: string
		/** PepCountry is the country associated with the client's politically exposed person status.
		 *
		 * [conditional] Required only if ApplicantIsPep is "yes".
		 */
		pepCountry?: string
		/** PepPosition is the position held by the client as a politically exposed person.
		 *
		 * [conditional] Required only if ApplicantIsPep is "yes".
		 */
		pepPosition?: string
		/** PepOrganisation is the organisation associated with the client as a politically exposed person.
		 *
		 * [conditional] Required only if ApplicantIsPep is "yes".
		 */
		pepOrganisation?: string
		/** ApplicantInRelationWithPep specifies whether the applicant is related to
		 * a politically exposed person.
		 *
		 * Required.
		 */
		applicantInRelationWithPep: string
		/** RelatedPepName is the name of the related politically exposed person.
		 *
		 * [conditional] Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepName?: string
		/** RelatedPepCountry is the country associated with the related politically exposed person.
		 *
		 * [conditional] Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepCountry?: string
		/** RelatedPepPosition is the position held by the related politically exposed person.
		 *
		 * [conditional] Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepPosition?: string
		/** RelatedPepOrganisation is the organisation associated with the related
		 * politically exposed person.
		 *
		 * [conditional] Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepOrganisation?: string
		/** RelatedPEPRelationshipWithApplicant specifies the applicant's relationship
		 * with the politically exposed person.
		 *
		 * [conditional] Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepRelationshipWithApplicant?: string
		/** RelatedPepFinancialRelationship specifies the applicant's financial
		 * relationship with the related politically exposed person.
		 *
		 * [conditional] Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepFinancialRelationship?: string
		/** InvestorCategory specifies the client's investor category.
		 *
		 * Required.
		 */
		investorCategory: string
		/** HighNetWorthInvestorCategory specifies the client's high-net-worth
		 * investor classification.
		 *
		 * [conditional] Required only if InvestorCategory is "highNetworthInvestor".
		 */
		highNetWorthInvestorCategory?: string
		/** AccreditedLicenseNumber is the client's accredited investor licence number.
		 *
		 * [conditional] Required only when applicable to the selected investor category.
		 */
		accreditedLicenseNumber?: string
		/** USPerson specifies whether the client is a US person.
		 *
		 * Required.
		 */
		usPerson: string
		/** SuitabilityAssessment contains the client's risk profile assessment details.
		 * Providing this field allows the client and suitability assessment to be created in a
		 * single request without calling the CreateSuitabilityAssessment API separately.
		 */
		suitabilityAssessment?: SuitabilityAssessment
	}

	/** CreateIndividualClientOutput is the response after creating or retrieving an individual client. */
	export interface CreateIndividualClientOutput {
		/** ClientID is the ID of the created or existing client. */
		clientId: string
		/** AlreadyExist reports whether the client already exists in Halogen. */
		alreadyExist: boolean
		/** Status is the status of the client. Value can be one of "pending", "active", "rejected" or "withdrawn". */
		status: string
	}

	/** CreateRequestCancellationInput is the input for cancelling a portfolio request. */
	export interface CreateRequestCancellationInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
		/** RequestID is the ID of the request to cancel.
		 *
		 * Required.
		 */
		requestId: string
	}

	/** CreateRequestCancellationOutput is the response after cancelling a portfolio request. */
	export interface CreateRequestCancellationOutput {
		/** RequestID is the newly created request ID. */
		requestId: string
	}

	/** CreateSuitabilityAssessmentInput is the input for creating a suitability assessment. */
	export interface CreateSuitabilityAssessmentInput {
		/** ClientID is the ID of the client who owns the assessment.
		 *
		 * Required.
		 */
		clientId: string
		/** SuitabilityAssessment is the assessment payload to create.
		 *
		 * Required.
		 */
		suitabilityAssessment?: SuitabilityAssessment
	}

	/** CreateSuitabilityAssessmentOutput is the response after creating a suitability assessment. */
	export interface CreateSuitabilityAssessmentOutput {
		/** SuitabilityAssessmentID is the newly created suitability assessment ID. */
		suitabilityAssessmentId: string
	}

	/** CreateWithdrawalRequestInput is the input for creating a portfolio withdrawal request. */
	export interface CreateWithdrawalRequestInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
		/** Amount is the withdrawal amount.
		 *
		 * Required. Must be greater than 0.
		 */
		amount: number
		/** ToBankAccountNumber is the destination bank account number.
		 *
		 * Required.
		 */
		toBankAccountNumber: string
	}

	/** CreateWithdrawalRequestOutput is the response after creating a portfolio withdrawal request. */
	export interface CreateWithdrawalRequestOutput {
		/** RequestID is the newly created request ID. */
		requestId: string
	}

	/** DuitNowBank represents a bank available for DuitNow payments. */
	export interface DuitNowBank {
		/** Code is the DuitNow bank code. */
		code: string
		/** Name is the display name of the bank. */
		name: string
		/** Url is the bank's DuitNow payment URL. */
		url: string
		/** ImageUrl is the URL of the bank's image. */
		imageUrl: string
	}

	/** GetClientAccountPortfolioAllocationPerformanceInput is the input for retrieving allocation performance. */
	export interface GetClientAccountPortfolioAllocationPerformanceInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
		/** Asset is the asset to retrieve performance for.
		 *
		 * Required.
		 */
		asset: string
		/** Timeframe specifies the historical range.
		 * Must be one of "3M", "6M", "1Y", "YTD", or "MAX".
		 *
		 * Required.
		 */
		timeframe: string
		/** Interval specifies the data granularity.
		 * Must be one of "day", "week", or "month".
		 *
		 * Required.
		 */
		interval: string
	}

	/** GetClientAccountPortfolioAllocationPerformanceOutput contains allocation performance data. */
	export interface GetClientAccountPortfolioAllocationPerformanceOutput {
		/** Performance is the list of allocation performance data points. */
		performance: PortfolioAllocationPerformance[]
	}

	/** GetPortfolioInput is the input for retrieving a portfolio. */
	export interface GetPortfolioInput {
		/** ID is the ID of the portfolio template.
		 *
		 * Required.
		 */
		id: string
		/** ClientID is the ID of the client for whom the portfolio is being retrieved.
		 *
		 * Required.
		 */
		clientId: string
	}

	/** GetPortfolioOutput contains the requested portfolio. */
	export interface GetPortfolioOutput {
		/** Portfolio is the requested portfolio. */
		portfolio: Portfolio
	}

	/** ListClientAccountPerformanceInput is the input for listing account performance. */
	export interface ListClientAccountPerformanceInput {
		/** ClientID is the ID of the client whose account performance is being listed.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountIDs filters for specific accounts.
		 *
		 * Required.
		 */
		accountIDs: string[]
		/** Timeframe specifies the historical range.
		 * Must be one of "3M", "6M", "1Y", "YTD", or "MAX".
		 *
		 * Required.
		 */
		timeframe: string
		/** Interval specifies the data granularity.
		 * Must be one of "day", "week", or "month".
		 *
		 * Required.
		 */
		interval: string
	}

	/** ListClientAccountPerformanceOutput contains the performance data. */
	export interface ListClientAccountPerformanceOutput {
		/** Performance is the list of performance data points. */
		performance: ClientAccountPerformance[]
	}

	/** ListClientAccountPortfolioAllocationsInput is the input for listing portfolio allocations. */
	export interface ListClientAccountPortfolioAllocationsInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
		/** ToDate filters allocations as of this date.
		 * If omitted, the latest available allocations are returned.
		 */
		toDate?: string
	}

	/** ListClientAccountPortfolioAllocationsOutput contains portfolio allocation information. */
	export interface ListClientAccountPortfolioAllocationsOutput {
		/** CanUpdateAllocations reports whether the portfolio allocations are editable. */
		canUpdateAllocations: boolean
		/** Allocations contains the list of portfolio allocations. */
		allocations: Allocation[]
	}

	/** ListClientAccountPortfolioRequestsInput is the input for listing portfolio transaction requests. */
	export interface ListClientAccountPortfolioRequestsInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
		/** RequestID filters the result to a single request. */
		requestId?: string
		/** Types filters by request types. */
		types?: string[]
		/** Statuses filters by request statuses. */
		statuses?: string[]
		/** BaseAssets filters by base asset. */
		baseAssets?: string[]
		/** FromDate filters requests created on or after this date in yyyy-mm-dd format. */
		fromDate?: string
		/** ToDate filters requests created on or before this date in yyyy-mm-dd format. */
		toDate?: string
		/** Limit specifies the maximum number of requests returned. */
		limit?: number
		/** Offset specifies the pagination offset. */
		offset?: number
		/** PollForCompletedPayment reports whether payment completion should be polled before returning. */
		pollForCompletedPayment: boolean
	}

	/** ListClientAccountPortfolioRequestsOutput contains portfolio transaction requests. */
	export interface ListClientAccountPortfolioRequestsOutput {
		/** Requests is the list of portfolio transaction requests. */
		requests: ClientAccountPortfolioRequest[]
	}

	/** ListClientAccountsInput contains parameters for filtering the list of client accounts. */
	export interface ListClientAccountsInput {
		/** ClientID is the ID of the client whose accounts are being listed.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountIDs filters the list of returned accounts.
		 * If not set, all accounts associated with the client are returned.
		 */
		accountIDs: string[]
		/** Status filters accounts by status.
		 * Must be one of "active" or "archived".
		 */
		status?: string
	}

	/** ListClientAccountsOutput contains the list of client accounts and summary data. */
	export interface ListClientAccountsOutput {
		/** Amount is the total value of all returned accounts. */
		amount: number
		/** Asset specifies the Amount's asset. */
		asset: string
		/** CanCreateAccount reports whether the requester can create a new account under the client. */
		canCreateAccount: boolean
		/** Accounts is the list of accounts the client has access to. Filter may apply using AccountIDs in the input. */
		accounts: ClientAccount[]
	}

	/** ListClientBankAccountsInput is the input for listing bank accounts. */
	export interface ListClientBankAccountsInput {
		/** ClientID is the ID of the client whose bank accounts are being listed.
		 *
		 * Required.
		 */
		clientId: string
	}

	/** ListClientBankAccountsOutput contains the list of registered bank accounts. */
	export interface ListClientBankAccountsOutput {
		/** BankAccounts is the list of bank accounts. */
		bankAccounts: BankAccount[]
	}

	/** ListClientsInput contains parameters for filtering and paginating clients referred by an MR client. */
	export interface ListClientsInput {
		/** ExactMatchCode reports whether only clients with the exact MR referral code should be returned.
		 * If false, clients with referral codes prefixed by the MR referral code may also be returned.
		 */
		exactMatchCode: boolean
		/** ToDate filters clients created on or before this date in yyyy-mm-dd format. */
		toDate?: string
		/** ClientType filters clients by type.
		 * Must be one of "individual" or "corporate".
		 */
		clientType?: string
		/** Status filters clients by status.
		 * Must be one of "active", "pending", "rejected", "withdrawn", or "followup".
		 */
		status?: string
		/** Limit specifies the maximum number of clients returned.
		 * Defaults to 10.
		 */
		limit?: number
		/** Offset specifies the pagination offset.
		 * Defaults to 0. Must be a multiple of Limit.
		 */
		offset?: number
	}

	/** ListClientsOutput contains the list of referred clients and total count. */
	export interface ListClientsOutput {
		/** Total is the total number of clients matching the filters. */
		total: number
		/** Clients is the list of referred clients. */
		clients: Client[]
	}

	/** ListDepositConsentsInput is the input for listing deposit consents. */
	export interface ListDepositConsentsInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
	}

	/** ListDepositConsentsOutput contains the list of deposit consents. */
	export interface ListDepositConsentsOutput {
		/** Consents is the list of consent items required before creating a deposit request. */
		consents: Consent[]
	}

	/** ListDuitnowBanksInput is the input for listing available DuitNow banks. */
	export interface ListDuitnowBanksInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
	}

	/** ListDuitnowBanksOutput contains the list of available DuitNow banks. */
	export interface ListDuitnowBanksOutput {
		/** Banks is the list of supported DuitNow banks. */
		banks: DuitNowBank[]
	}

	export interface ListNatureOfBusinessesInput {
	}

	/** ListNatureOfBusinessesOutput contains the list of nature of business. */
	export interface ListNatureOfBusinessesOutput {
		/** Natures is the list of nature of businesses available when creating an individual client. */
		natures: NatureOfBusiness[]
	}

	/** ListPortfolioLimitsInput is the input for listing portfolio transaction limits. */
	export interface ListPortfolioLimitsInput {
		/** ClientID is the ID of the client who owns the account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the account.
		 *
		 * Required.
		 */
		accountId: string
	}

	/** ListPortfolioLimitsOutput contains the deposit and withdrawal limits for a portfolio. */
	export interface ListPortfolioLimitsOutput {
		/** Asset is the asset used for the limit amounts. */
		asset: string
		/** MinimumDepositAmount is the minimum deposit amount. */
		minimumDepositAmount: number
		/** MaximumDepositAmount is the maximum deposit amount. */
		maximumDepositAmount: number
		/** MinimumWithdrawalAmount is the minimum withdrawal amount. */
		minimumWithdrawalAmount: number
		/** MaximumWithdrawalAmount is the maximum withdrawal amount. */
		maximumWithdrawalAmount: number
	}

	/** ListPortfoliosInput is the input for listing portfolios. */
	export interface ListPortfoliosInput {
	}

	/** ListPortfoliosOutput contains the list of portfolios. */
	export interface ListPortfoliosOutput {
		/** Portfolios is the list of portfolios available to the client. */
		portfolios: Portfolio[]
	}

	/** NatureOfBusiness represents an available nature of business option. */
	export interface NatureOfBusiness {
		/** ID is the ID of the nature of business. */
		id: string
		/** Label is the display label of the nature of business. */
		label: string
	}

	/** PermissionOption represents a permission available for a client account. */
	export interface PermissionOption {
		/** Value is the permission value. */
		value: string
		/** Label is the display label of the permission. */
		label: string
	}

	/** Portfolio represents an investment portfolio and whether it should be recommended for a client. */
	export interface Portfolio {
		/** ID of the portfolio template */
		id: string
		/** Unique code of the portfolio. */
		code: string
		/** Name of the portfolio. */
		name: string
		/** ShortName of the portfolio. */
		shortName: string
		/** Relative order of the portfolio within a group. */
		rank: number
		/** Indicates if the portfolio is recommended based on suitability assessment. */
		shouldRecommend: boolean
		/** Group or category of the portfolio. */
		group: string
		/** Short description of the portfolio. */
		description: string
		/** Expected return of the portfolio. */
		targetedReturns: number
		/** Currency in which the portfolio is denominated. */
		baseCurrency: string
		/** Risk level of the portfolio. */
		riskLabel: string
		/** Risk score of the portfolio. */
		riskScore: number
		/** Brief description of the portfolio’s risk. */
		riskDescription: string
		/** Fee charged for managing the portfolio. */
		managementFeePercentage: number
		/** Fee charged for custody the portfolio. */
		custodianFeePercentage: number
		/** Sales charge */
		subscriptionFeePercentage: number
		/** IconUrl refers to the icon of the protfolio */
		iconUrl: string
		/** IsFeatured reports whether the portfolio is featured */
		isFeatured: boolean
		/** List of assets and their allocations. */
		assets: PortfolioAsset[]
	}

	/** PortfolioAllocationPerformance represents a performance data point for a portfolio allocation. */
	export interface PortfolioAllocationPerformance {
		/** Date is the valuation date of the performance data point. */
		date: string
		/** IsInceptionDate reports whether the data point represents the allocation's inception date. */
		isInceptionDate: boolean
		/** Units is the number of units held on the given date. */
		units: number
		/** Asset is the asset associated with the allocation. */
		asset: string
		/** Value is the value of the allocation on the given date. */
		value: number
	}

	/** PortfolioAsset represents an individual asset within a portfolio. */
	export interface PortfolioAsset {
		/** ID of the asset. */
		id: string
		/** Code of the asset. */
		code: string
		/** Name of the asset. */
		name: string
		/** Title displayed as the primary text for this asset in the web and mobile form components. */
		title: string
		/** Subtitle displayed as the secondary/supporting text below the title in the web and mobile form components. */
		subtitle: string
		/** Objective describes the investment objective of the asset. */
		objective: string
		/** FundProvider specifies the provider or manager of the fund. */
		fundProvider: string
		/** URL of the asset image. */
		imageUrl: string
		/** Type of asset, e.g., "spot" or "fund". */
		type: string
		/** ShariahCompliant indicates whether the asset adheres to Shariah investment principles. */
		shariahCompliant: boolean
		/** Color used to represent the asset. */
		hexColor: string
		/** Group or category of the asset. */
		group: string
		/** Color used to represent the asset group. */
		groupHexColor: string
		/** Target exposure percentage of this asset in the portfolio. */
		exposurePercentage: number
		/** Minimum allowed exposure percentage for this asset in the portfolio. */
		minimumExposurePercentage: number
		/** RiskScore specifies the risk level of the asset. */
		riskScore: number
		/** ListingDate specifies the date when the asset was listed or made available. */
		listingDate: string
		/** ExternalURL is the URL to the asset's site document. */
		externalURl: string
	}

	/** SimulateCompleteDuitnowPaymentInput is the input for simulating the
	 * completion of a DuitNow payment.
	 */
	export interface SimulateCompleteDuitnowPaymentInput {
		/** ClientID is the ID of the client who initiated the DuitNow payment.
		 *
		 * Required.
		 */
		clientId: string
		/** ReferenceID is the DuitNow payment reference ID.
		 *
		 * Required.
		 */
		referenceId: string
	}

	/** SimulateCompleteDuitnowPaymentOutput is the response after successfully
	 * simulating the completion of a DuitNow payment.
	 */
	export interface SimulateCompleteDuitnowPaymentOutput {
	}

	/** SimulateCreateIndividualClientFromApplicantInput is the input for simulating
	 * the creation of an individual client from an applicant.
	 */
	export interface SimulateCreateIndividualClientFromApplicantInput {
		/** ApplicantID is the ID of the applicant to create the client from.
		 *
		 * Required.
		 */
		applicantId: string
	}

	/** SimulateCreateIndividualClientFromApplicantOutput is the response after
	 * simulating the creation of an individual client from an applicant.
	 */
	export interface SimulateCreateIndividualClientFromApplicantOutput {
		/** ClientID is the ID of the created client. */
		clientId: string
	}

	/** SimulatePortfolioRebalanceInput is the input for simulating a portfolio
	 * rebalance.
	 */
	export interface SimulatePortfolioRebalanceInput {
	}

	/** SimulatePortfolioRebalanceOutput is the response returned after successfully
	 * simulating a portfolio rebalance.
	 */
	export interface SimulatePortfolioRebalanceOutput {
	}

	/** SimulateUpdateClientBankAccountStatusVerificationFailedInput is the input for
	 * simulating a failed client bank account verification.
	 */
	export interface SimulateUpdateClientBankAccountStatusVerificationFailedInput {
		/** ClientID is the ID of the client who owns the bank account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the client's account.
		 *
		 * Required.
		 */
		accountId: string
		/** BankAccountNumber is the bank account number whose verification failed.
		 *
		 * Required.
		 */
		bankAccountNumber: string
	}

	/** SimulateUpdateClientBankAccountStatusVerificationFailedOutput is the response
	 * after simulating a failed client bank account verification.
	 */
	export interface SimulateUpdateClientBankAccountStatusVerificationFailedOutput {
	}

	/** SimulateUpdateClientBankAccountStatusVerifiedInput is the input for simulating
	 * a client bank account being verified.
	 */
	export interface SimulateUpdateClientBankAccountStatusVerifiedInput {
		/** ClientID is the ID of the client who owns the bank account.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountID is the ID of the client's account.
		 *
		 * Required.
		 */
		accountId: string
		/** BankAccountNumber is the bank account number to verify.
		 *
		 * Required.
		 */
		bankAccountNumber: string
	}

	/** SimulateUpdateClientBankAccountStatusVerifiedOutput is the response after
	 * simulating a client bank account being verified.
	 */
	export interface SimulateUpdateClientBankAccountStatusVerifiedOutput {
	}

	/** SimulateUpdateClientRequestStatusApprovedInput is the input for simulating
	 * a client deposit or withdrawal request being approved.
	 */
	export interface SimulateUpdateClientRequestStatusApprovedInput {
		/** RequestID is the ID of the deposit or withdrawal request to approve.
		 * Only one request can be processed per call.
		 *
		 * Required.
		 */
		requestId: string
	}

	/** SimulateUpdateClientRequestStatusApprovedOutput is the response after
	 * simulating a client deposit or withdrawal request being approved.
	 */
	export interface SimulateUpdateClientRequestStatusApprovedOutput {
	}

	/** SimulateUpdateClientRequestStatusSettledInput is the input for simulating
	 * a client deposit or withdrawal request being settled.
	 */
	export interface SimulateUpdateClientRequestStatusSettledInput {
		/** RequestID is the ID of the deposit or withdrawal request to settle.
		 * Only one request can be processed per call.
		 *
		 * Required.
		 */
		requestId: string
	}

	/** SimulateUpdateClientRequestStatusSettledOutput is the response after
	 * simulating a client deposit or withdrawal request being settled.
	 */
	export interface SimulateUpdateClientRequestStatusSettledOutput {
	}

	/** SimulateUpdateClientStatusApprovedInput is the input for simulating
	 * the approval of a client change request.
	 */
	export interface SimulateUpdateClientStatusApprovedInput {
		/** ClientID is the ID of the client whose status will be updated.
		 *
		 * Required.
		 */
		clientId: string
	}

	/** SimulateUpdateClientStatusApprovedOutput is the response after
	 * simulating the approval of a client change request.
	 */
	export interface SimulateUpdateClientStatusApprovedOutput {
	}

	/** SuitabilityAssessment represents a client's investment suitability assessment. */
	export interface SuitabilityAssessment {
		/** InvestmentExperience describes the client's prior investment experience.
		 * Must be one of "limited", "basic", "considerable", or "extensive".
		 *
		 * Required.
		 */
		investmentExperience: string
		/** InvestmentObjective describes the client's investment goals.
		 * Must be one of "capitalPreservation", "income", "growthCapitalGain", or "aggressiveGrowth".
		 *
		 * Required.
		 */
		investmentObjective: string
		/** InvestmentHorizon describes how long the client plans to invest.
		 * Must be one of "lessThan1Year", "1To3Years", "3To5Years", or "moreThan5Years".
		 *
		 * Required.
		 */
		investmentHorizon: string
		/** CurrentInvestment describes the client's current portfolio status.
		 * Must be one of "cashFixedDeposits", "fixedIncomeSecurities", "properties", or "equitiesDerivatives".
		 *
		 * Required.
		 */
		currentInvestment: string
		/** ReturnExpectations describes the client's expected return and risk appetite.
		 * Must be one of "08040", "1208-05", "1812-10", or "3018-15".
		 *
		 * Required.
		 */
		returnExpectations: string
	}

	export interface RequestOptions {
		idempotencyKey?: string
	}

	export interface HttpClientOptions {
		/**
		 * The keyId provided by the Partner portal when the API key is created.
		 * 
		 * Required.
		*/
		keyId: string
		/**
		 * The privateKeyPEM is the PEM format of either RSA or EC private key created on the client side. 
		 * 
		 * Required.
		*/
		privateKeyPEM: string
		/**
		 * The endpoint of which the server calls.
		 * 
		 * Optional, defaulted to production endpoint.
		 */
		endpoint?: string
		/**
		 * The jwtTtlSeconds is the JWT time-to-live since issuing it.
		 * 
		 * Optional, defaulted to 30 seconds.
		 */
		jwtTtlSeconds?: number
		/**
		 * The timeoutMilliseconds is the HTTP timeout duration.
		 * 
		 * Optional, defaulted to 10 seconds.
		 */
		timeoutMilliseconds?: number
		/**
		 * The debug reports whether the client should log debugging statements. It is helpful in development enviornment.
		 * 
		 * Avoid switching it on in production environment for security and performance reasons.
		 * 
		 * Optional, defaulted to false.
		 */
		debug?: boolean
	}

	export class HttpClient extends Signer {
		constructor(opts: HttpClientOptions) {
			super(opts.keyId, opts.privateKeyPEM, opts.endpoint, opts.jwtTtlSeconds, opts.timeoutMilliseconds, opts.debug)
		}
		/** CreateAccount creates a new client account and optionally a portfolio fund.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createAccount(input: CreateAccountInput, options?: RequestOptions) : Promise<CreateAccountOutput> {
			return this.command<CreateAccountInput, CreateAccountOutput>("create_account", input, options)
		}

		/** CreateClientBankAccounts creates client bank accounts for the client.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createClientBankAccounts(input: CreateClientBankAccountsInput, options?: RequestOptions) : Promise<CreateClientBankAccountsOutput> {
			return this.command<CreateClientBankAccountsInput, CreateClientBankAccountsOutput>("create_client_bank_accounts", input, options)
		}

		/** CreateClientDocumentFromUrl creates client onboarding
		 * documents from one-time downloadable document links.
		 *
		 * Errors:
		 *   - ErrClientNotEligible
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createClientDocumentFromUrl(input: CreateClientDocumentFromUrlInput, options?: RequestOptions) : Promise<CreateClientDocumentFromUrlOutput> {
			return this.command<CreateClientDocumentFromUrlInput, CreateClientDocumentFromUrlOutput>("create_client_document_from_url", input, options)
		}

		/** CreateDepositRequest creates a deposit request for a portfolio account.
		 *
		 * Errors:
		 *   - ErrActionNotAllowedForAccountType
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createDepositRequest(input: CreateDepositRequestInput, options?: RequestOptions) : Promise<CreateDepositRequestOutput> {
			return this.command<CreateDepositRequestInput, CreateDepositRequestOutput>("create_deposit_request", input, options)
		}

		/** CreateDuitnowPayment creates a DuitNow payment URL for a deposit request.
		 *
		 * Errors:
		 *   - ErrDuitNowInvalidParameter
		 *   - ErrDuitNowUnavailable
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrMissingResource
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createDuitnowPayment(input: CreateDuitnowPaymentInput, options?: RequestOptions) : Promise<CreateDuitnowPaymentOutput> {
			return this.command<CreateDuitnowPaymentInput, CreateDuitnowPaymentOutput>("create_duitnow_payment", input, options)
		}

		/** CreateIndividualClient creates an individual client or returns the existing client if one already exists.
		 *
		 * Errors:
		 *   - ErrAlreadyExists
		 *   - ErrClientNotEligible
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createIndividualClient(input: CreateIndividualClientInput, options?: RequestOptions) : Promise<CreateIndividualClientOutput> {
			return this.command<CreateIndividualClientInput, CreateIndividualClientOutput>("create_individual_client", input, options)
		}

		/** CreateRequestCancellation cancels a pending portfolio request.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrRequestCannotBeCancelled
		 *   - ErrUnauthorizedIPAddress
		 */
		async createRequestCancellation(input: CreateRequestCancellationInput, options?: RequestOptions) : Promise<CreateRequestCancellationOutput> {
			return this.command<CreateRequestCancellationInput, CreateRequestCancellationOutput>("create_request_cancellation", input, options)
		}

		/** CreateSuitabilityAssessment creates a suitability assessment for the client.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createSuitabilityAssessment(input: CreateSuitabilityAssessmentInput, options?: RequestOptions) : Promise<CreateSuitabilityAssessmentOutput> {
			return this.command<CreateSuitabilityAssessmentInput, CreateSuitabilityAssessmentOutput>("create_suitability_assessment", input, options)
		}

		/** CreateWithdrawalRequest creates a withdrawal request for a portfolio account.
		 *
		 * Errors:
		 *   - ErrActionNotAllowedForAccountType
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createWithdrawalRequest(input: CreateWithdrawalRequestInput, options?: RequestOptions) : Promise<CreateWithdrawalRequestOutput> {
			return this.command<CreateWithdrawalRequestInput, CreateWithdrawalRequestOutput>("create_withdrawal_request", input, options)
		}

		/** GetClientAccountPortfolioAllocationPerformance retrieves historical performance data for a specific portfolio allocation.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async getClientAccountPortfolioAllocationPerformance(input: GetClientAccountPortfolioAllocationPerformanceInput) : Promise<GetClientAccountPortfolioAllocationPerformanceOutput> {
			return this.query<GetClientAccountPortfolioAllocationPerformanceInput, GetClientAccountPortfolioAllocationPerformanceOutput>("get_client_account_portfolio_allocation_performance", input)
		}

		/** GetPortfolio retrieves a portfolio by ID for a given MR client and client.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async getPortfolio(input: GetPortfolioInput) : Promise<GetPortfolioOutput> {
			return this.query<GetPortfolioInput, GetPortfolioOutput>("get_portfolio", input)
		}

		/** ListClientAccountPerformance lists historical performance data for one or more client accounts over a specified timeframe.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listClientAccountPerformance(input: ListClientAccountPerformanceInput) : Promise<ListClientAccountPerformanceOutput> {
			return this.query<ListClientAccountPerformanceInput, ListClientAccountPerformanceOutput>("list_client_account_performance", input)
		}

		/** ListClientAccountPortfolioAllocations lists portfolio allocation information for the specified client account.
		 *
		 * Errors:
		 *   - ErrAccountNotPrivateMandate
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listClientAccountPortfolioAllocations(input: ListClientAccountPortfolioAllocationsInput) : Promise<ListClientAccountPortfolioAllocationsOutput> {
			return this.query<ListClientAccountPortfolioAllocationsInput, ListClientAccountPortfolioAllocationsOutput>("list_client_account_portfolio_allocations", input)
		}

		/** ListClientAccountPortfolioRequests lists all portfolio transaction requests for a specific account with optional filtering and pagination.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAccountExperience
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listClientAccountPortfolioRequests(input: ListClientAccountPortfolioRequestsInput) : Promise<ListClientAccountPortfolioRequestsOutput> {
			return this.query<ListClientAccountPortfolioRequestsInput, ListClientAccountPortfolioRequestsOutput>("list_client_account_portfolio_requests", input)
		}

		/** ListClientAccounts lists all the accounts associated with the client.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listClientAccounts(input: ListClientAccountsInput) : Promise<ListClientAccountsOutput> {
			return this.query<ListClientAccountsInput, ListClientAccountsOutput>("list_client_accounts", input)
		}

		/** ListClientBankAccounts lists all bank accounts registered to the client that can be used for portfolio withdrawals.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listClientBankAccounts(input: ListClientBankAccountsInput) : Promise<ListClientBankAccountsOutput> {
			return this.query<ListClientBankAccountsInput, ListClientBankAccountsOutput>("list_client_bank_accounts", input)
		}

		/** ListClients lists clients referred by an MR client with optional filtering, sorting and pagination.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listClients(input: ListClientsInput) : Promise<ListClientsOutput> {
			return this.query<ListClientsInput, ListClientsOutput>("list_clients", input)
		}

		/** ListDepositConsents lists the consent items required for creating a deposit request.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrSuitabilityAssessmentRequired
		 *   - ErrUnauthorizedIPAddress
		 */
		async listDepositConsents(input: ListDepositConsentsInput) : Promise<ListDepositConsentsOutput> {
			return this.query<ListDepositConsentsInput, ListDepositConsentsOutput>("list_deposit_consents", input)
		}

		/** ListDuitnowBanks lists available DuitNow banks for creating a DuitNow payment.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listDuitnowBanks(input: ListDuitnowBanksInput) : Promise<ListDuitnowBanksOutput> {
			return this.query<ListDuitnowBanksInput, ListDuitnowBanksOutput>("list_duitnow_banks", input)
		}

		/** ListNatureOfBusinesses lists the available nature of business values for creating an individual client.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listNatureOfBusinesses(input: ListNatureOfBusinessesInput) : Promise<ListNatureOfBusinessesOutput> {
			return this.query<ListNatureOfBusinessesInput, ListNatureOfBusinessesOutput>("list_nature_of_businesses", input)
		}

		/** ListPortfolioLimits lists the minimum and maximum deposit and withdrawal limits for a portfolio account.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAccountExperience
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listPortfolioLimits(input: ListPortfolioLimitsInput) : Promise<ListPortfolioLimitsOutput> {
			return this.query<ListPortfolioLimitsInput, ListPortfolioLimitsOutput>("list_portfolio_limits", input)
		}

		/** ListPortfolios lists portfolios available to a client for a given MR client.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInsufficientAccess
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async listPortfolios(input: ListPortfoliosInput) : Promise<ListPortfoliosOutput> {
			return this.query<ListPortfoliosInput, ListPortfoliosOutput>("list_portfolios", input)
		}

		/** SimulateCompleteDuitnowPayment simulates completing a DuitNow payment for a
		 * deposit request.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateCompleteDuitnowPayment(input: SimulateCompleteDuitnowPaymentInput, options?: RequestOptions) : Promise<SimulateCompleteDuitnowPaymentOutput> {
			return this.command<SimulateCompleteDuitnowPaymentInput, SimulateCompleteDuitnowPaymentOutput>("simulate_complete_duitnow_payment", input, options)
		}

		/** Simulates creating an individual client after being onboarded using Halogen Wallet.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrOperationNotAllowed
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateCreateIndividualClientFromApplicant(input: SimulateCreateIndividualClientFromApplicantInput, options?: RequestOptions) : Promise<SimulateCreateIndividualClientFromApplicantOutput> {
			return this.command<SimulateCreateIndividualClientFromApplicantInput, SimulateCreateIndividualClientFromApplicantOutput>("simulate_create_individual_client_from_applicant", input, options)
		}

		/** SimulatePortfolioRebalance creates a portfolio rebalance plan, creates trades
		 * from the generated plan instructions, books the trades, and marks the plan as
		 * completed.
		 *
		 * Deposit requests must first be approved and settled by calling:
		 *
		 * 1. SimulateUpdateClientRequestStatusApproved API.
		 * 2. SimulateUpdateClientRequestStatusSettled API.
		 *
		 * Otherwise, the deposited funds will not be included in the portfolio rebalance.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulatePortfolioRebalance(input: SimulatePortfolioRebalanceInput, options?: RequestOptions) : Promise<SimulatePortfolioRebalanceOutput> {
			return this.command<SimulatePortfolioRebalanceInput, SimulatePortfolioRebalanceOutput>("simulate_portfolio_rebalance", input, options)
		}

		/** SimulateUpdateClientBankAccountStatusVerificationFailed simulates marking a
		 * client's bank account verification as failed.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidParameter
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateUpdateClientBankAccountStatusVerificationFailed(input: SimulateUpdateClientBankAccountStatusVerificationFailedInput, options?: RequestOptions) : Promise<SimulateUpdateClientBankAccountStatusVerificationFailedOutput> {
			return this.command<SimulateUpdateClientBankAccountStatusVerificationFailedInput, SimulateUpdateClientBankAccountStatusVerificationFailedOutput>("simulate_update_client_bank_account_status_verification_failed", input, options)
		}

		/** SimulateUpdateClientBankAccountStatusVerified simulates updating a client
		 * bank account status to verified.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateUpdateClientBankAccountStatusVerified(input: SimulateUpdateClientBankAccountStatusVerifiedInput, options?: RequestOptions) : Promise<SimulateUpdateClientBankAccountStatusVerifiedOutput> {
			return this.command<SimulateUpdateClientBankAccountStatusVerifiedInput, SimulateUpdateClientBankAccountStatusVerifiedOutput>("simulate_update_client_bank_account_status_verified", input, options)
		}

		/** SimulateUpdateClientRequestStatusApproved simulates approving a client deposit
		 * or withdrawal request by booking its associated fund income or expense
		 * transaction.
		 *
		 * To simulate a deposit request approved after the client is active:
		 *
		 * 1. Call CreateDepositRequest API.
		 * 2. Call CreateDuitnowPayment API.
		 * 3. Call SimulateCompleteDuitnowPayment API to complete the DuitNow payment.
		 * 4. Call SimulateUpdateClientRequestStatusApproved API to approve the request.
		 *
		 * To simulate a withdrawal request approved after the client is active:
		 *
		 * 1. Call CreateWithdrawalRequest API.
		 * 2. Call SimulateUpdateClientRequestStatusApproved API to approve the request.
		 *
		 * Only deposit and withdrawal transactions are supported. One transaction can
		 * be processed per request.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateUpdateClientRequestStatusApproved(input: SimulateUpdateClientRequestStatusApprovedInput, options?: RequestOptions) : Promise<SimulateUpdateClientRequestStatusApprovedOutput> {
			return this.command<SimulateUpdateClientRequestStatusApprovedInput, SimulateUpdateClientRequestStatusApprovedOutput>("simulate_update_client_request_status_approved", input, options)
		}

		/** SimulateUpdateClientRequestStatusSettled simulates settling a client deposit
		 * or withdrawal request by settling its associated fund income or expense
		 * transaction.
		 *
		 * To simulate a deposit request settled after the deposit is approved and client is active:
		 *
		 * 1. Call CreateDepositRequest API.
		 * 2. Call CreateDuitnowPayment API.
		 * 3. Call SimulateCompleteDuitnowPayment API to complete the DuitNow payment.
		 * 4. Call SimulateUpdateClientRequestStatusApproved API to approve the request.
		 * 5. Call SimulateUpdateClientRequestStatusSettled API to settle the request.
		 *
		 * To simulate a withdrawal request settled after the withdrawal is approved and client is active:
		 *
		 * 1. Call CreateWithdrawalRequest API.
		 * 2. Call SimulateUpdateClientRequestStatusApproved API to approve the request.
		 * 3. Call SimulateUpdateClientRequestStatusSettled API to settle the request.
		 *
		 * Only deposit and withdrawal transactions are supported. One transaction can
		 * be processed per request.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateUpdateClientRequestStatusSettled(input: SimulateUpdateClientRequestStatusSettledInput, options?: RequestOptions) : Promise<SimulateUpdateClientRequestStatusSettledOutput> {
			return this.command<SimulateUpdateClientRequestStatusSettledInput, SimulateUpdateClientRequestStatusSettledOutput>("simulate_update_client_request_status_settled", input, options)
		}

		/** Simulates approving a client, and updating the client status to active.
		 *
		 * This API is available only in the spot environment and is not available in production.
		 *
		 * Errors:
		 *   - ErrExpiredApiKey
		 *   - ErrExpiredAuthToken
		 *   - ErrInternal
		 *   - ErrInvalidAuthSignature
		 *   - ErrInvalidAuthToken
		 *   - ErrInvalidHeader
		 *   - ErrInvalidPublicKey
		 *   - ErrInvalidRoute
		 *   - ErrMissingHeader
		 *   - ErrMissingParameter
		 *   - ErrOperationNotAllowed
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateUpdateClientStatusApproved(input: SimulateUpdateClientStatusApprovedInput, options?: RequestOptions) : Promise<SimulateUpdateClientStatusApprovedOutput> {
			return this.command<SimulateUpdateClientStatusApprovedInput, SimulateUpdateClientStatusApprovedOutput>("simulate_update_client_status_approved", input, options)
		}

	}

}
