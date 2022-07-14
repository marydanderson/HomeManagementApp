import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectScope } from '../../project-scope.model';
import { WorkService } from '../work.service';


@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})
export class WorkFormComponent implements OnInit {
  workForm: FormGroup;
  columns: string;
  item: string;
  workFormDetails: ProjectScope = {
    name: "",
  }
  isEditMode = true;
  projectID;
  @Input() editFormToggle: boolean;

  constructor(private route: ActivatedRoute, public workScopeService: WorkService) { }

  ngOnInit(): void {
    this.workForm = new FormGroup({
      name: new FormControl(null),
      details: new FormControl(null),
      qty: new FormControl(null),
      qtyUnit: new FormControl(null),
      unitPrice: new FormControl(null),
      calculatedPrice: new FormControl(null),
      url: new FormControl(null),
      photo: new FormControl(null),
    })
    console.log('edit form toggle: (should be true) ', this.editFormToggle)

    // Get project firestore ID from route
    this.route.params.subscribe((params: Params) => {
      console.log('raw params: ', params['id'])
      this.projectID = params['id'];
      console.log('project params id: ', this.projectID)
      // this.projectDoc = this.projectService.getProject(this.idx)
    })

  }

  // submit form for adding work scope items
  onFormSubmit(formObj: NgForm) {
    console.log('Submitted!', this.workForm);
    this.workFormDetails.name = formObj.value.name

    if (this.editFormToggle) {
      //Edit Mode Logic:
      // firestore update method from service
      this.workScopeService.createProjectScope(this.projectID,'test scope item')
    } else {
      //Add new logic:
      //firestore add new scope logic from service
      // create service for projectScope since it's going to have calculations and lenghtly logic
    }
  }

}
