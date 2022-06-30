import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/authentication/auth.service';
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
  title = '';

  constructor(
    private projectService: ProjectService,
    private afs: AngularFirestore,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    // http request to pre load projects in database
    this.retrieveProjects();
  }

  refreshList() {
    this.currentProject = undefined;
    this.currentIndex = -1;
    this.retrieveProjects();
  }

  retrieveProjects() {
    this.projectService.getAllProjects().snapshotChanges().pipe(
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
    this.currentIndex = index
  }


}
