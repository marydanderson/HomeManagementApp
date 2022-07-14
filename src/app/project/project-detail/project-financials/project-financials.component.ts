import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-financials',
  templateUrl: './project-financials.component.html',
  styleUrls: ['./project-financials.component.css']
})
export class ProjectFinancialsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



// estGrandTotal key in Project scope is calculated by taking all scope items cost; this Project scope is loaded into the Project model
// for scope line item, click button to edit or add or delete; when that button for 'finish edit, finish add' or 'delete' is clicked, the estGrandTotal of the scope is recalculated
// 1) add items to scope form
