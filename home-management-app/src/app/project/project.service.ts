import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import Project from './project-detail/project.model';



@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{
  projectsFirestoreRef: AngularFirestoreCollection<Project>;

  constructor(private authService: AuthService, private afs: AngularFirestore)
  {
    this.projectsFirestoreRef = this.afs.collection('users').doc(this.authService.userData.uid).collection('projects')
   }

  ngOnInit(): void {

  }

  getAllProjects(): AngularFirestoreCollection<Project> {
    return this.projectsFirestoreRef
  }

  createProject(project: Project): any {
    return this.projectsFirestoreRef.add({...project})
  }

  updateProject(id: string, data: any): Promise<void> {
    return this.projectsFirestoreRef.doc(id).update(data)
  }

  delete(id: string): Promise<void> {
    return this.projectsFirestoreRef.doc(id).delete();
  }


  // updateScope(project) {
  //   this.projectDoc = this.afs.doc(`users/${this.authService.userData.uid}/projects/${project.id}`);
  //   this.projectDoc.update({scope: 'test scope'})
  // }

}
