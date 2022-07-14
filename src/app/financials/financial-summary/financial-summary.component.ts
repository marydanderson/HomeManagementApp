import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CompiledLoanDataObject } from '../loan-amortization/loan-amor.model';
import { LoanApiService } from '../loan-api.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css']
})
export class FinancialSummaryComponent implements OnInit, OnChanges {
  compiledLoanData?: CompiledLoanDataObject[];
  loanDataFound = false;

  constructor(private loanService: LoanApiService) { }

  ngOnInit(): void {
    this.retrieveLoanData();
    // if (this.compiledLoanData.length !== undefined) { this.loanDataFound = true}
  }

  ngOnChanges(): void {
  }



  retrieveLoanData() {
    this.loanService.getLoanData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.compiledLoanData = data;
      if (data.length > 0) {this.loanDataFound = true}
    })
  }

}
