import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-wish',
  templateUrl: './project-wish.component.html',
  styleUrls: ['./project-wish.component.css']
})
export class ProjectWishComponent implements OnInit {

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
  }

}
