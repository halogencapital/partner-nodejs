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
	export interface Allocation {
		id: string
		name: string
		shortName: string
		code: string
		/** spot, fund */
		type: string
		exposurePercentage: number
		targetExposurePercentage: number
		fundClassSequence: number
		fundClassLabel: string
		canDistribute: boolean
		distributedAmount: number
		netInflow: number
		pnlAmount: number
		pnlPercentage: number
		quoteAsset: string
		totalInflow: number
		totalOutflow: number
		totalRebate: number
		totalDividendReinvested: number
		units: number
		unitPrice: number
		value: number
		valuationDate: string
		totalBuy: number
		totalSell: number
		totalDeposit: number
		totalWithdrawal: number
		totalFees: number
		minimumExposurePercentage: number
		group: string
		class: string
		hexColor: string
		imageUrl: string
		isFiat: boolean
		title: string
		subtitle: string
		shariahCompliant: boolean
		objective: string
		fundProvider: string
		listingDate: string
		externalURl: string
	}

	export interface BankAccount {
		clientAccountId: string
		accountNumber: string
		accountName: string
		accountCurrency: string
		accountType: string
		bankName: string
		bankBic: string
		referenceNumber: string
		imageUrl: string
		status: string
		source: string
		createdAt: string
		createdBy: string
	}

	export interface Client {
		id: string
		name: string
		email?: string
		msisdn?: string
		authorisedPersonName?: string
		authorisedPersonEmail?: string
		authorisedPersonMsisdn?: string
		investorCategory: string
		type: string
		referredBy: string
		status: string
		createdAt: string
	}

	export interface ClientAccount {
		id: string
		type: string
		name: string
		label: string
		experience: string
		experienceLabel: string
		asset: string
		status: string
		portfolioValue: number
		exposurePercentage: number
		pnlAmount: number
		pnlPercentage: number
		netInflow: number
		totalInflow: number
		totalOutflow: number
		pendingSwitchInAmount: number
		permissionOptions: PermissionOption[]
		canDeposit: boolean
		canWithdraw: boolean
	}

	export interface ClientAccountPerformance {
		/** Date is the valuation date of the performance point
		 * in YYYY-MM-DD format.
		 */
		date: string
		/** IsInceptionDate reports whether the data point is on the
		 * same date of creating the account
		 */
		isInceptionDate: boolean
		/** AccountID is the unique identifier of the portfolio account. */
		accountId: string
		/** Value is the portfolio value of the account on the given date,
		 * expressed in the client's display currency.
		 */
		value: number
	}

	export interface ClientAccountPortfolioRequest {
		id: string
		/** Deposit / Withdraw / Buy / Sell */
		type: string
		baseAsset: string
		baseAmount?: number
		quoteAsset: string
		quoteAmount?: number
		requestedAmount?: number
		feePercentage: number
		feeAmount: number
		postFeeAmount: number
		collectionBankAccount?: BankAccount
		illustrationLabel: string
		unitPrice: number
		status: string
		statusDescription: string
		canCancel: boolean
		hasConfirmationStatement: boolean
		createdAt: string
		navDate?: string
		settlementDate?: string
		toBankBic?: string
		toBankAccountName?: string
		toBankAccountNumber?: string
		voucherCode?: string
	}

	export interface Consent {
		name: string
		label: string
	}

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
		/** Code is the code for the portfolio.
		 *
		 * Optional. Only required if Experience is "portfolio".
		 */
		code?: string
	}

	export interface CreateAccountOutput {
		/** AccountID is the newly created account ID. */
		accountId: string
	}

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

	export interface CreateClientBankAccountsOutput {
	}

	export interface CreateClientDocumentFromUrlInput {
		/** ClientID is the ID of the client who owns the onboarding documents.
		 *
		 * Required.
		 */
		clientId: string
		/** FrontNricUrl is the one-time download URL for the front side of the client's NRIC.
		 *
		 * Required if the client's nationality is Malaysia.
		 */
		frontNricUrl?: string
		/** BackNricUrl is the one-time download URL for the back side of the client's NRIC.
		 *
		 * Required if the client's nationality is Malaysia.
		 */
		backNricUrl?: string
		/** PassportUrl is the one-time download URL for the client's passport document.
		 *
		 * Required if the client's nationality is not Malaysia.
		 */
		passportUrl?: string
		/** SelfieUrl is the one-time download URL for the client's selfie image.
		 *
		 * Required.
		 */
		selfieUrl: string
	}

	export interface CreateClientDocumentFromUrlOutput {
	}

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
		/** ... */
		duitnowBankCode: string
	}

	export interface CreateDepositRequestOutput {
		/** RequestID is the newly created request ID. */
		requestId: string
		/** ... */
		duitnowPaymentUrl: string
	}

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

	export interface CreateDuitnowPaymentOutput {
		/** ReferenceID is the reference ID used to identify the DuitNow payment. */
		referenceId: string
		/** Url is the redirect URL for completing the DuitNow payment. */
		url: string
	}

	export interface CreateIndividualClientInput {
		/** Name is the full name of the client as stated in official documents.
		 *
		 * Required.
		 */
		name: string
		/** Nationality is the nationality of the client.
		 *
		 * Required.
		 */
		nationality: string
		/** Msisdn is the phone number of the client.
		 *
		 * Required.
		 */
		msisdn: string
		/** Email is the email address of the client.
		 *
		 * Required.
		 */
		email: string
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
		/** SourceOfWealth specifies the client's sources of wealth.
		 *
		 * Required.
		 */
		sourceOfWealth: string[]
		/** InvestorCategory specifies the client's investor category.
		 *
		 * Required.
		 */
		investorCategory: string
		/** HighNetWorthInvestorCategory specifies the client's high-net-worth
		 * investor classification.
		 *
		 * Required only if InvestorCategory is a highNetworthInvestor investor category.
		 */
		highNetWorthInvestorCategory?: string
		/** USPerson specifies whether the client is a US person.
		 *
		 * Required.
		 */
		usPerson: string
		/** ApplicantIsPep specifies whether the applicant is a politically exposed person.
		 *
		 * Required.
		 */
		applicantIsPep: string
		/** ApplicantInRelationWithPep specifies whether the applicant is related to
		 * a politically exposed person.
		 *
		 * Required.
		 */
		applicantInRelationWithPep: string
		/** NricNo is the Malaysian NRIC number of the client.
		 *
		 * Required only for Malaysian clients.
		 */
		nricNo?: string
		/** PassportNo is the passport number of the client.
		 *
		 * Required only for non-Malaysian clients.
		 */
		passportNo?: string
		/** DateOfBirth is the date of birth of the client.
		 *
		 * Required only for non-Malaysian clients.
		 */
		dateOfBirth?: string
		/** Gender is the gender of the client.
		 *
		 * Required only for non-Malaysian clients.
		 */
		gender?: string
		/** OtherEmploymentType specifies the employment type when EmploymentType is "other".
		 *
		 * Required only if EmploymentType is "other".
		 */
		otherEmploymentType?: string
		/** Designation is the client's job designation. */
		designation?: string
		/** NatureOfBusiness specifies the nature of the client's business. */
		natureOfBusiness?: string
		/** OtherNatureOfBusiness specifies the nature of business when
		 * NatureOfBusiness is "other".
		 *
		 * Required only if NatureOfBusiness is "other".
		 */
		otherNatureOfBusiness?: string
		/** PurposeOfInvestment specifies the client's purpose for making the investment. */
		purposeOfInvestment?: string
		/** CompanyName is the name of the client's employer or company. */
		companyName?: string
		/** AnnualIncome specifies the client's annual income range. */
		annualIncome?: string
		/** OtherSourceOfWealth specifies the source of wealth when SourceOfWealth
		 * contains "other".
		 *
		 * Required only if SourceOfWealth contains "other".
		 */
		otherSourceOfWealth?: string
		/** AccreditedLicenseNumber is the client's accredited investor licence number.
		 *
		 * Required only when applicable to the selected investor category.
		 */
		accreditedLicenseNumber?: string
		/** PepCountry is the country associated with the client's politically exposed person status.
		 *
		 * Required only if ApplicantIsPep is "yes".
		 */
		pepCountry?: string
		/** PepPosition is the position held by the client as a politically exposed person.
		 *
		 * Required only if ApplicantIsPep is "yes".
		 */
		pepPosition?: string
		/** PepOrganisation is the organisation associated with the client as a politically exposed person.
		 *
		 * Required only if ApplicantIsPep is "yes".
		 */
		pepOrganisation?: string
		/** RelatedPepName is the name of the related politically exposed person.
		 *
		 * Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepName?: string
		/** RelatedPepCountry is the country associated with the related politically exposed person.
		 *
		 * Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepCountry?: string
		/** RelatedPepPosition is the position held by the related politically exposed person.
		 *
		 * Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepPosition?: string
		/** RelatedPepOrganisation is the organisation associated with the related
		 * politically exposed person.
		 *
		 * Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepOrganisation?: string
		/** RelatedPEPRelationshipWithApplicant specifies the applicant's relationship
		 * with the politically exposed person.
		 *
		 * Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepRelationshipWithApplicant?: string
		/** RelatedPepFinancialRelationship specifies the applicant's financial
		 * relationship with the related politically exposed person.
		 *
		 * Required only if ApplicantInRelationWithPep is "yes".
		 */
		relatedPepFinancialRelationship?: string
		/** SuitabilityAssessment contains the client's suitability assessment and
		 * risk profile information.
		 *
		 * Required
		 */
		suitabilityAssessment?: SuitabilityAssessment
	}

	export interface CreateIndividualClientOutput {
		/** ClientID is the ID of the created or existing client. */
		clientId: string
		/** AlreadyExist reports whether the client already exists in Halogen. */
		alreadyExist: boolean
		/** Status is the status of the client. Value can be one of "pending", "active", "rejected" or "withdrawn". */
		status: string
	}

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

	export interface CreateRequestCancellationOutput {
		/** RequestID is the newly created request ID. */
		requestId: string
	}

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

	export interface CreateSuitabilityAssessmentOutput {
		/** SuitabilityAssessmentID is the newly created suitability assessment ID. */
		suitabilityAssessmentId: string
	}

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

	export interface CreateWithdrawalRequestOutput {
		/** RequestID is the newly created request ID. */
		requestId: string
	}

	export interface DuitNowBank {
		code: string
		name: string
		url: string
		imageUrl: string
	}

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
		 *
		 * Required. Value can be one of "3M", "6M", "1Y", "YTD" or "MAX".
		 */
		timeframe: string
		/** Interval specifies the data granularity.
		 *
		 * Required. Value can be one of "day", "week" or "month".
		 */
		interval: string
	}

	export interface GetClientAccountPortfolioAllocationPerformanceOutput {
		/** Performance is the list of allocation performance data points. */
		performance: PortfolioAllocationPerformance[]
	}

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

	export interface GetPortfolioOutput {
		/** Portfolio is the requested portfolio. */
		portfolio: Portfolio
	}

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
		/** Timeframe specifies the duration.
		 *
		 * Required. Value can be one of "3M", "6M", "1Y", "YTD" or "MAX".
		 */
		timeframe: string
		/** Interval specifies the data granularity.
		 *
		 * Required. Value can be one of "day", "week" or "month".
		 */
		interval: string
	}

	export interface ListClientAccountPerformanceOutput {
		/** Performance is the list of performance data points. */
		performance: ClientAccountPerformance[]
	}

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
		 *
		 * Optional. If nil, the latest available allocations are returned.
		 */
		toDate?: string
	}

	export interface ListClientAccountPortfolioAllocationsOutput {
		/** CanUpdateAllocations reports whether the portfolio allocations are editable. */
		canUpdateAllocations: boolean
		/** Allocations contains the list of portfolio allocations. */
		allocations: Allocation[]
	}

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
		/** RequestID filters the result to a single request.
		 *
		 * Optional.
		 */
		requestId?: string
		/** Types filters by request types.
		 *
		 * Optional.
		 */
		types?: string[]
		/** Statuses filters by request statuses.
		 *
		 * Optional.
		 */
		statuses?: string[]
		/** BaseAssets filters by base asset.
		 *
		 * Optional.
		 */
		baseAssets?: string[]
		/** FromDate filters requests created on or after this date in yyyy-mm-dd format.
		 *
		 * Optional.
		 */
		fromDate?: string
		/** ToDate filters requests created on or before this date in yyyy-mm-dd format.
		 *
		 * Optional.
		 */
		toDate?: string
		/** Limit specifies the maximum number of requests returned.
		 *
		 * Optional.
		 */
		limit?: number
		/** Offset specifies the pagination offset.
		 *
		 * Optional.
		 */
		offset?: number
		/** PollForCompletedPayment reports whether payment completion should be polled before returning.
		 *
		 * Optional.
		 */
		pollForCompletedPayment: boolean
	}

	export interface ListClientAccountPortfolioRequestsOutput {
		/** Requests is the list of portfolio transaction requests. */
		requests: ClientAccountPortfolioRequest[]
	}

	export interface ListClientAccountsInput {
		/** ClientID is the ID of the client whose accounts are being listed.
		 *
		 * Required.
		 */
		clientId: string
		/** AccountIDs filters the list of returned accounts.
		 *
		 * Optional. If not set, all accounts associated with the client are returned.
		 */
		accountIDs: string[]
		/** Status filters accounts by status.
		 *
		 * Optional. Value can be one of "active" or "archived".
		 */
		status?: string
	}

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

	export interface ListClientBankAccountsInput {
		/** ClientID is the ID of the client whose bank accounts are being listed.
		 *
		 * Required.
		 */
		clientId: string
	}

	export interface ListClientBankAccountsOutput {
		/** BankAccounts is the list of bank accounts. */
		bankAccounts: BankAccount[]
	}

	export interface ListClientsInput {
		/** ExactMatchCode reports whether only clients with the exact MR referral code should be returned.
		 *
		 * Optional. If false, clients with referral codes prefixed by the MR referral code may also be returned.
		 */
		exactMatchCode: boolean
		/** ToDate filters clients created on or before this date in yyyy-mm-dd format.
		 *
		 * Optional.
		 */
		toDate?: string
		/** ClientType filters clients by type.
		 *
		 * Optional. Value can be one of "individual" or "corporate".
		 */
		clientType?: string
		/** Status filters clients by status.
		 *
		 * Optional. Value can be one of "active", "pending", "rejected" or "withdrawn".
		 */
		status?: string
		/** Limit specifies the maximum number of clients returned.
		 *
		 * Optional. Defaults to 10.
		 */
		limit?: number
		/** Offset specifies the pagination offset.
		 *
		 * Optional. Defaults to 0. Must be a multiple of Limit.
		 */
		offset?: number
	}

	export interface ListClientsOutput {
		/** Total is the total number of clients matching the filters. */
		total: number
		/** Clients is the list of referred clients. */
		clients: Client[]
	}

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

	export interface ListDepositConsentsOutput {
		/** Consents is the list of consent items required before creating a deposit request. */
		consents: Consent[]
	}

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

	export interface ListDuitnowBanksOutput {
		/** Banks is the list of supported DuitNow banks. */
		banks: DuitNowBank[]
	}

	export interface ListNatureOfBusinessesInput {
	}

	export interface ListNatureOfBusinessesOutput {
		/** Natures is the list of nature of businesses required before creating individual client */
		natures: NatureOfBusiness[]
	}

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

	export interface ListPortfoliosInput {
	}

	export interface ListPortfoliosOutput {
		/** Portfolios is the list of portfolios available to the client. */
		portfolios: Portfolio[]
	}

	export interface NatureOfBusiness {
		id: string
		label: string
	}

	export interface PermissionOption {
		value: string
		label: string
	}

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

	export interface PortfolioAllocationPerformance {
		date: string
		isInceptionDate: boolean
		units: number
		asset: string
		value: number
	}

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

	export interface SimulateCompleteDuitnowPaymentOutput {
	}

	export interface SimulateCreateIndividualClientFromApplicantInput {
		/** ApplicantID is the ID of the applicant to create the client from.
		 *
		 * Required.
		 */
		applicantId: string
	}

	export interface SimulateCreateIndividualClientFromApplicantOutput {
		/** ClientID is the ID of the created client. */
		clientId: string
	}

	export interface SimulatePortfolioRebalanceInput {
	}

	export interface SimulatePortfolioRebalanceOutput {
	}

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

	export interface SimulateUpdateClientBankAccountStatusVerificationFailedOutput {
	}

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

	export interface SimulateUpdateClientBankAccountStatusVerifiedOutput {
	}

	export interface SimulateUpdateClientRequestStatusApprovedInput {
		/** RequestID is the ID of the deposit or withdrawal request to approve.
		 * Only one request can be processed per call.
		 *
		 * Required.
		 */
		requestId: string
	}

	export interface SimulateUpdateClientRequestStatusApprovedOutput {
	}

	export interface SimulateUpdateClientRequestStatusSettledInput {
		/** RequestID is the ID of the deposit or withdrawal request to settle.
		 * Only one request can be processed per call.
		 *
		 * Required.
		 */
		requestId: string
	}

	export interface SimulateUpdateClientRequestStatusSettledOutput {
	}

	export interface SimulateUpdateClientStatusApprovedInput {
		/** ClientID is the ID of the client whose status will be updated.
		 *
		 * Required.
		 */
		clientId: string
	}

	export interface SimulateUpdateClientStatusApprovedOutput {
	}

	export interface SuitabilityAssessment {
		investmentExperience: string
		investmentObjective: string
		investmentHorizon: string
		currentInvestment: string
		returnExpectations: string
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
		async createAccount(input: CreateAccountInput) : Promise<CreateAccountOutput> {
			return this.command<CreateAccountInput, CreateAccountOutput>("create_account", input)
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
		async createClientBankAccounts(input: CreateClientBankAccountsInput) : Promise<CreateClientBankAccountsOutput> {
			return this.command<CreateClientBankAccountsInput, CreateClientBankAccountsOutput>("create_client_bank_accounts", input)
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
		async createClientDocumentFromUrl(input: CreateClientDocumentFromUrlInput) : Promise<CreateClientDocumentFromUrlOutput> {
			return this.command<CreateClientDocumentFromUrlInput, CreateClientDocumentFromUrlOutput>("create_client_document_from_url", input)
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
		async createDepositRequest(input: CreateDepositRequestInput) : Promise<CreateDepositRequestOutput> {
			return this.command<CreateDepositRequestInput, CreateDepositRequestOutput>("create_deposit_request", input)
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
		async createDuitnowPayment(input: CreateDuitnowPaymentInput) : Promise<CreateDuitnowPaymentOutput> {
			return this.command<CreateDuitnowPaymentInput, CreateDuitnowPaymentOutput>("create_duitnow_payment", input)
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
		async createIndividualClient(input: CreateIndividualClientInput) : Promise<CreateIndividualClientOutput> {
			return this.command<CreateIndividualClientInput, CreateIndividualClientOutput>("create_individual_client", input)
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
		async createRequestCancellation(input: CreateRequestCancellationInput) : Promise<CreateRequestCancellationOutput> {
			return this.command<CreateRequestCancellationInput, CreateRequestCancellationOutput>("create_request_cancellation", input)
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
		 *   - ErrMissingParameter
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async createSuitabilityAssessment(input: CreateSuitabilityAssessmentInput) : Promise<CreateSuitabilityAssessmentOutput> {
			return this.command<CreateSuitabilityAssessmentInput, CreateSuitabilityAssessmentOutput>("create_suitability_assessment", input)
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
		async createWithdrawalRequest(input: CreateWithdrawalRequestInput) : Promise<CreateWithdrawalRequestOutput> {
			return this.command<CreateWithdrawalRequestInput, CreateWithdrawalRequestOutput>("create_withdrawal_request", input)
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

		/** ListNatureOfBusinesses lists the possible values of nature of businesses required before creating individual client.
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
		async simulateCompleteDuitnowPayment(input: SimulateCompleteDuitnowPaymentInput) : Promise<SimulateCompleteDuitnowPaymentOutput> {
			return this.command<SimulateCompleteDuitnowPaymentInput, SimulateCompleteDuitnowPaymentOutput>("simulate_complete_duitnow_payment", input)
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
		 *   - ErrRateLimitExceeded
		 *   - ErrUnauthorizedIPAddress
		 */
		async simulateCreateIndividualClientFromApplicant(input: SimulateCreateIndividualClientFromApplicantInput) : Promise<SimulateCreateIndividualClientFromApplicantOutput> {
			return this.command<SimulateCreateIndividualClientFromApplicantInput, SimulateCreateIndividualClientFromApplicantOutput>("simulate_create_individual_client_from_applicant", input)
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
		async simulatePortfolioRebalance(input: SimulatePortfolioRebalanceInput) : Promise<SimulatePortfolioRebalanceOutput> {
			return this.command<SimulatePortfolioRebalanceInput, SimulatePortfolioRebalanceOutput>("simulate_portfolio_rebalance", input)
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
		async simulateUpdateClientBankAccountStatusVerificationFailed(input: SimulateUpdateClientBankAccountStatusVerificationFailedInput) : Promise<SimulateUpdateClientBankAccountStatusVerificationFailedOutput> {
			return this.command<SimulateUpdateClientBankAccountStatusVerificationFailedInput, SimulateUpdateClientBankAccountStatusVerificationFailedOutput>("simulate_update_client_bank_account_status_verification_failed", input)
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
		async simulateUpdateClientBankAccountStatusVerified(input: SimulateUpdateClientBankAccountStatusVerifiedInput) : Promise<SimulateUpdateClientBankAccountStatusVerifiedOutput> {
			return this.command<SimulateUpdateClientBankAccountStatusVerifiedInput, SimulateUpdateClientBankAccountStatusVerifiedOutput>("simulate_update_client_bank_account_status_verified", input)
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
		async simulateUpdateClientRequestStatusApproved(input: SimulateUpdateClientRequestStatusApprovedInput) : Promise<SimulateUpdateClientRequestStatusApprovedOutput> {
			return this.command<SimulateUpdateClientRequestStatusApprovedInput, SimulateUpdateClientRequestStatusApprovedOutput>("simulate_update_client_request_status_approved", input)
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
		async simulateUpdateClientRequestStatusSettled(input: SimulateUpdateClientRequestStatusSettledInput) : Promise<SimulateUpdateClientRequestStatusSettledOutput> {
			return this.command<SimulateUpdateClientRequestStatusSettledInput, SimulateUpdateClientRequestStatusSettledOutput>("simulate_update_client_request_status_settled", input)
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
		async simulateUpdateClientStatusApproved(input: SimulateUpdateClientStatusApprovedInput) : Promise<SimulateUpdateClientStatusApprovedOutput> {
			return this.command<SimulateUpdateClientStatusApprovedInput, SimulateUpdateClientStatusApprovedOutput>("simulate_update_client_status_approved", input)
		}

	}

}
