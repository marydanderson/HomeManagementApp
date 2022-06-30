
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import Project from '../project-detail/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  project: Project = new Project();
  submitted = false;
  statuses = ['future, ongoing, complete']

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

  }

  addProjectToDatabase() {
    this.projectService.createProject(this.project).then(() => {
      console.log('project added to database!');
      this.submitted = true;
    })
  }

  initializeNewProject() {
    this.submitted = false;
    this.project = new Project();
  }

}
