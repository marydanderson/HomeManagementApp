import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-navbar',
  templateUrl: './project-navbar.component.html',
  styleUrls: ['./project-navbar.component.css']
})
export class ProjectNavbarComponent implements OnInit {
  id: string;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    // get ID for project from routing from parent component
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    })
    console.log('project id navbar, ', this.id)

    // this.projectService.getProject()

  }

}
