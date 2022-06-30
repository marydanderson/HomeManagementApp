import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompiledLoanDataObject, LoanApiSummary, LoanFormInput } from './loan-amor.model';
import { LoanPaymentSchedule } from './loan-amor.model';
import { LoanApiService } from '../loan-api.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-loan-amorization-form',
  templateUrl: './loan-amorization-form-component.html',
  styleUrls: ['./loan-amorization-form-component.css']
})

// API DOC: https://www.commercialloandirect.com/amortization-schedule-api.html

export class LoanAmorizationFormComponent implements OnInit {
  loanScheduleData: LoanPaymentSchedule[] = [];
  loanSummaryData: LoanApiSummary[] = [];
  loanCompiledData: Object;
  loanTotalInterest = 0;
  purchasePrice: number = 0;
  // for initializing blank Compiled loan object for firestore:

  constructor(private http: HttpClient, private loanApiService: LoanApiService, private router: Router) { }

  ngOnInit(): void {

  }



  // disable form submit if required fields are blank


// FIX: INTEREST RATE DOESN'T WORK IF A DECIMIAL IS INPUTTED
// FIX: ADD REQUIRED PARAMETERES / ERRORS
// FIX: AMOUNTS DO NOT MATCH UP W/ ACTUAL AMOR. CALC

// Fetch data from API w/ form values
  onSubmit(form: NgForm) {
    // Destructure inputted form values
    const { loanAmount, interestRate, loanAmort, loanOriginationDate, interestOnlyPeriod, paymentFreq, compoundFreq } = form.value;
    this.purchasePrice  = form.value.purchasePrice


    // Send HTTP GET Request to the API
    this.http.get(`https://www.commercialloandirect.com/monthlyPaymentAPI.php?
      pv=${loanAmount}
      &rate=${interestRate}
      &nperiod=${loanAmort}
      &io=${interestOnlyPeriod}
      &pf=${paymentFreq}
      &cf=${compoundFreq}
      &pt=0&mode=json`
    )
      .subscribe((apiResponse) => {
        // Find Age of Loan
        this.loanApiService.calculateUpToYearInterest(apiResponse, this.calculateLoanAge(loanOriginationDate))
        this.loanApiService.saveLoanData(apiResponse, this.purchasePrice) // save loan Data (summary, payment summary, total interest)
      }
      );
      this.router.navigateByUrl('/nav/financials')

  }

  calculateLoanAge(inputDate) {
    // form format = 2022-05-04
    const formDate = new Date(inputDate);
    const currentDate = new Date();
    const difference = Math.abs(currentDate.valueOf() - formDate.valueOf())
    const differenceYears = (difference / 31536000000).toFixed(0);
    console.log('difference years', differenceYears);
    return differenceYears
  }

}
