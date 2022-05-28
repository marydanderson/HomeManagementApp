import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';
import { CompiledLoanDataObject, LoanApiSummary } from './loan-amortization/loan-amor.model';
import { LoanPaymentSchedule } from './loan-amortization/loan-amor.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class LoanApiService {

 // FUTURE : make into a Subject
  // loanData = new EventEmitter();
  loanData = new Subject();

  private myLoanData: CompiledLoanDataObject;

  constructor(private http: HttpClient, private authService: AuthService ) { }

  // API DOC: https://www.commercialloandirect.com/amortization-schedule-api.html


// SAVE loan data from user input, then sent to API, calculated by API and sent back from API, to FIREBASE
  saveLoanData(apiReturn, purchasePrice: number) {
    const compiledLoanData = new CompiledLoanDataObject(
      this.saveLoanApiSummaryData(apiReturn),
      this.saveLoanApiScheduleData(apiReturn),
      this.calculateTotalInterest(apiReturn),
      purchasePrice
    )
    console.log('compiled data obj', compiledLoanData)
    // store on firebase
    this.http.post('https://house-management-91707-default-rtdb.firebaseio.com/financials/loan.json',
      compiledLoanData
    ).subscribe(responseData => {
      responseData
    })
    this.myLoanData = compiledLoanData;
    console.log(this.myLoanData)
    return this.myLoanData
  }

  // GET / LOAD LOAN DATA
  getLoanData() {
      return this.http.get(
        'https://house-management-91707-default-rtdb.firebaseio.com/financials/loan.json')
        .subscribe(responseData => {
          // emit the data so our components can subscribe to it
          this.loanData.next(responseData)
        });

  }


  private saveLoanApiSummaryData(apiReturn) {
    // -------Format Loan Summary API Return------------
      // Grab first item in API array = loan summary
      const apiLoanSummaryObj: Object = apiReturn[0]
      // Extract the values (the API keys are not retrievable, so manually assigning to newly created keys)
      const summaryValuesArray: number[] = Object.values(apiLoanSummaryObj);
      // store&create LoanPaymentSummary Obj from results | utilize in rest of the app
      const loanPaymentSummary = new LoanApiSummary (
        summaryValuesArray[0], // interest only payment
        summaryValuesArray[1], // principal + int payment
        summaryValuesArray[2], // number of payments
        summaryValuesArray[3], // periodic interest rate
        summaryValuesArray[4], // total payments
      )
    // console.log('stored summary obj', loanPaymentSummary)
    return loanPaymentSummary
  }

  private saveLoanApiScheduleData(apiReturn) {
    const formattedSchedule =  this.formatScheuleData(apiReturn)
    return formattedSchedule;
  }

  private calculateTotalInterest(apiReturn) {
    let data: LoanPaymentSchedule[] = this.formatScheuleData(apiReturn);
    let totalInterest = 0;
    data.forEach((paymentFreq) => {
      totalInterest += paymentFreq.intererstPaid;
    })
    console.log('total loan inteest', totalInterest)
    return totalInterest;
  }

  calculateUpToYearInterest(apiReturn, loanAge) {
    //  loanAge = currentDate - LoanOriginationDate (REF function in .form.ts component)
    let data: LoanPaymentSchedule[] = this.formatScheuleData(apiReturn);
    let totalInterest = 0;
    for (let i = 0; i < loanAge; i++) {
      totalInterest += data[i].intererstPaid
    }
    console.log('year to date interest', totalInterest)
  }

  private formatScheuleData(apiReturn) {
    // -------Format Loan Schedule API Return------------
    // Grab 2nd item in API array = array of loan schedule (in loan terms i.e. years)
      const apiScheduleArray: LoanPaymentSchedule[] = apiReturn[1]
      const finalScheduleArray: LoanPaymentSchedule[] = [];
      apiScheduleArray.forEach(data => {
      let scheduleValuesArray: number[] = Object.values(data);
      const retrievedScheduleValueItem = new LoanPaymentSchedule(
        scheduleValuesArray[0], // Year
        scheduleValuesArray[1], // Balance
        scheduleValuesArray[2], // Interest Paid
        scheduleValuesArray[3], // Principal
      )
      finalScheduleArray.push(retrievedScheduleValueItem)
    })
    // console.log('formatted schedule', finalScheduleArray)
    return finalScheduleArray;
  }

}