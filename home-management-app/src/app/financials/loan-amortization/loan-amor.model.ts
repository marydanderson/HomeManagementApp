export class APILoan {
  constructor(
    public pv: number, //loan amount
    public rate: number, //int rate
    public nperiod: number, //loan amortization (years)
    public io: number, //interst only period
    public pf: number, // payment frequency
    public cf: number, //compound frequency
    public pt: 0, //payment type (default end of period)
    public mode: JSON
  ) { }
}

export class LoanFormInput {
  constructor(
    public loanAmount: number,
    public interestRate: number,
    public loanAmort: number,
    public loanOriginationDate: number,
    public interestOnlyPeriod: number,
    public paymentFreq: number,
    public compoundFreq: number,
  ) { }
}

// { "Year": 1, "Balance": 987351.12, "Interest Paid": 58075.52, "Principal": 12648.88 }

// Formaat of returned API results for loan amorization
// export class LoanApiResultSummary {
//   constructor(
//     public interestOnlyPayment: number,
//     public numberPayments: number,
//     public periodicIntRate: number, // interest rate
//     public prinicpalPlusIntPayment: number,
//     public totalPayments: number
//   ) { }
// }



// ------Object saved to firestore------
export class CompiledLoanDataObject {
  constructor(
    public summary: Object,
    public schedule: Object,
    public totalInterest: number,
    public purchasePrice: number,
  ) { }
}

// For use in 'CompiledLoanDataObject' for schedule: xx
export class LoanPaymentSchedule{
  constructor(
    public year: number,
    public balance: number,
    public intererstPaid: number,
    public principal: number
  ) { }
}

// For use in 'CompiledLoanDataObject' for summary: xx
export class LoanApiSummary {
  constructor(
    public interestOnlyPayment: number,
    public prinicpalPlusIntPayment: number,
    public numberPayments: number,
    public periodicIntRate: number,
    public totalPayments: number,
  ) { }
}

