import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ProjectService } from '../project.service';
import Project from './project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnChanges {

  @Input() project?: Project;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentProject: Project = {
    name: '',
    room: '',
    description: '',
    status: '',
    grandTotal: null,
    estTotal: null,
    created: null,
    scope: null
  };
  message = '';

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentProject = {...this.currentProject}
  }

  updateProject() {
    const data: Project = {
      name: this.currentProject.name,
      room: this.currentProject.room,
      description: this.currentProject.description,
      status: this.currentProject.status,
      grandTotal: this.currentProject.grandTotal,
      estTotal: this.currentProject.estTotal,
      created: this.currentProject.created,
      scope: this.currentProject.scope
    }
    if (this.currentProject.id) { //id is assigned by index in project-list html ngIf (only an ID if it's selected)
      this.projectService.updateProject(this.currentProject.id, data)
        .then(() => this.message = 'Updated!')
        .catch(err => console.log(err))

    }
  }



}
