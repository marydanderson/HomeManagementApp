import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { CompiledLoanDataObject, LoanApiSummary } from './loan-amortization/loan-amor.model';
import { LoanPaymentSchedule } from './loan-amortization/loan-amor.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class LoanApiService {
  // loanData = new Subject();
  loanCollectionRef: AngularFirestoreCollection<CompiledLoanDataObject>;
  loanData: Observable<CompiledLoanDataObject[]>;
  loanDoc: AngularFirestoreCollection<CompiledLoanDataObject>;
  loanDataForFirestore: CompiledLoanDataObject = {
    summary: null,
    schedule: null,
    totalInterest: 0,
    purchasePrice: 0
  }

  constructor(private http: HttpClient, private authService: AuthService, private afs: AngularFirestore) {
    this.loanCollectionRef = this.afs
      .collection('users')
      .doc(this.authService.userData.uid)
      .collection('loan');
   }



// SAVE loan data from user input, then sent to API, calculated by API and sent back from API, to Firestore
  saveLoanData(apiReturn, purchasePrice: number) {
    const compiledLoanData: CompiledLoanDataObject = {
      summary: this.saveLoanApiSummaryData(apiReturn),
      schedule: this.saveLoanApiScheduleData(apiReturn),
      totalInterest: this.calculateTotalInterest(apiReturn),
      purchasePrice: purchasePrice
    }
    const json = JSON.parse(JSON.stringify(compiledLoanData));
    console.log('json data: ', json)

    // Store on Firestore
    this.loanCollectionRef.add(json)
      .then((dataAdded) => {
        console.log('compiled loan data API added to firestore: ', dataAdded)
      })
      .catch((error) => {
      console.error('Error adding loan data document', error)
    })
  }

  // FUTURE ---> MOVE THIS TO SEP. FINANCIAL SERVICE; Goal is to have a sep. service for the api
  getLoanData(): AngularFirestoreCollection<CompiledLoanDataObject> {
    return this.loanCollectionRef;
  }

// ------------- API RETRIEVAL---------------
// ---------API DOC: https://www.commercialloandirect.com/amortization-schedule-api.html----------
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
    let lastYearSummaryIndex = data.pop();
    let totalInterest = lastYearSummaryIndex.intererstPaid
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
