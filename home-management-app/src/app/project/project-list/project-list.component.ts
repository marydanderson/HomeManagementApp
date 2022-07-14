import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import Project from '../project-detail/project.model';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects?: Project[];
  currentProject?: Project;
  currentIndex = -1;
  filterSelected = false //for ngIf hiding/showing filter search bar
  statuses = ['Future', 'Ongoing', 'Complete']


  constructor(
    private projectService: ProjectService,
    ) { }

  ngOnInit(): void {
    // load projects from Firestore
    this.retrieveProjects();
  }

  changeFilterStatus() {
    this.filterSelected = !this.filterSelected;
  }

  refreshList() {
    this.currentProject = undefined;
    this.currentIndex = -1;
    this.retrieveProjects();
  }

  retrieveProjects() {
    this.projectService.getAllProjects().snapshotChanges().pipe(
      /* getAllProjects returns a list of observables; the outer map operator would emit an individual
      Observable into the inner map operator which then allows me to access the payload data from the http response */
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.projects = data;
    })
  }

  setActiveProject(project: Project, index: number) {
    this.currentProject = project;
    console.log('project index:', index)
    this.currentIndex = index //index is the *ngFor array created in html, not the doc ID
  }

  deleteProject(project: Project) {
    this.projectService.delete(project.id);
    alert(`${project.name} was deleted`);
  }


}
