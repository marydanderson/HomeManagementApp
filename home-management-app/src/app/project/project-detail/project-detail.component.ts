import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from './project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;
  idx: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    // Get project firestore ID from route
    this.route.params.subscribe((params: Params) => {
      this.idx = params['id'];
      console.log('project params idx: ', this.idx)
      // this.projectDoc = this.projectService.getProject(this.idx)
    })


    //Load / get the project from firestore
    this.projectService.getProject(this.idx)
      .subscribe(project => {
        console.log('subscribed project: ', project.name);
        this.project = project;
    });
  }
}
