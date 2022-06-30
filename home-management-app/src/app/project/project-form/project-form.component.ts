// -------------TEMPLATE DRIVEN APPROACH START --------

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../project-detail/project.model';
import { ProjectService } from '../project.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  statuses = ['Future', 'Ongoing', 'Completed'];
  id: number;
  projectDetails: Project = {
    id: '',
    name: '',
    room: '',
    description: '',
    status: '',
    grandTotal: 0,
    estTotal: 0,
  }

  submittedStatus = false;
  addAnotherProject: boolean = false;
  subscription: Subscription;
  editedItemIndex: number;
  editedProject: Project;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    })


  }

  onSubmit(form: NgForm) {
    // Assign submitted form Project to component projectDetails to push to database
    this.projectDetails = new Project(
        '',
        form.value.projectName,
        form.value.projectRoom,
        form.value.projectDescription,
        form.value.projectStatus,
        0,
        form.value.estTotal
    )
    console.log(this.projectDetails)
    // Add project to database w/ service
    this.projectService.createProject(this.projectDetails)
    this.submittedStatus = true;
  }

  ngOnDestory() {
    // prevent memory leak
    this.subscription.unsubscribe();
  }

}
