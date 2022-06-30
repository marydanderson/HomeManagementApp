import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Project from '../project-detail/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-work-breakdown',
  templateUrl: './work-breakdown.component.html',
  styleUrls: ['./work-breakdown.component.css']
})
export class WorkBreakdownComponent implements OnInit {
  project: Project;
  id: string;
  editFormToggle = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.id = params['id'];
      // this.project = this.projectService.getProject(this.id)
      console.log(this.id)
    })

    // this.projectService.getProject(this.id).subscribe(projectData => {
    //   this.project = projectData;
    // });
  }

  addScope() {
    console.log('test')

  }

  // Retrieve individual project w/ service from database
  getProject(idx: number) {

  }

  // for toggling view of 'scope edit form component' on/off
  onEditClicked() {
    console.log('form view shown')
    this.editFormToggle = true;
  }
}
