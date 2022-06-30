import { Injectable } from '@angular/core';
import { ProjectScope } from '../project-scope.model';
import { AuthService } from 'src/app/authentication/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Project } from '../project-detail/project.model';
import { ProjectService } from '../project.service';


@Injectable({
  providedIn: 'root'
})
export class WorkService {
  projectCollection: AngularFirestoreCollection<Project>;
  project: AngularFirestoreDocument<Project>


  constructor(private authService: AuthService, public afs: AngularFirestore, private projectService: ProjectService) {
        // Firestore route for project Collection w/in each user
        this.projectCollection = this.afs
        .collection('users')
        .doc(this.authService.userData.uid)
        .collection('projects')

  }


  //create new ProjectScope object and add to correct Project Object (Project scope is a key w/in Project)
  createProjectScope(projectId, scope: string) {
    //update scope line value (which is defaulted as nothing) w/ project
    // this.projectCollection.doc(projectId).update({ scope: scope })
    this.projectCollection.doc(projectId)
      .update({ scope: scope }) //TEST

  }
}
