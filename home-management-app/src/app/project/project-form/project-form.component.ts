
import { Component, OnInit } from '@angular/core';
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
  statuses = ['Future', 'Ongoing', 'Complete']

  constructor(
    private projectService: ProjectService,
    ) { }

  ngOnInit(): void {

  }

  addProjectToDatabase() {
    console.log(this.project.name)
    this.project.id =
      this.projectService.createProject(this.project);
    this.submitted = true;
  }

  initializeNewProject() {
    this.submitted = false;
    this.project = new Project();
  }


}
