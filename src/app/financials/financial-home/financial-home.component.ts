import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-home',
  templateUrl: './financial-home.component.html',
  styleUrls: ['./financial-home.component.css']
})
export class FinancialHomeComponent implements OnInit {
  isLoanFormSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddLoanData() {
    this.isLoanFormSelected = true;
  }

  onCloseLoanData() {
    this.isLoanFormSelected = false;
  }

}
