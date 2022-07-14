// Service for retrieving/loading info from Firestore to user profile;
//        REF AUTH SERVICE for login / signup, create user

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  user: Observable<User>;

  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  getUserData() {
    this.user = this.afs
      .collection('users')
      .doc(this.authService.userData.uid)
      .valueChanges()
    return this.user
  }
}
