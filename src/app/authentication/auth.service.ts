import { Injectable, NgZone } from "@angular/core";
import { User } from "../user/user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: any; // save logged in user data
  dataObsevable: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    public afs: AngularFirestore, // cloud database
    public afAuth: AngularFireAuth, // auth from firebase
    public router: Router,
    public ngZone: NgZone, // remove outside scope warnings
  ) {
    /* Save user date in localstorage when logged in and setting up null when logged out
    constructor fire every time an object is created; hence if a user objet is created/deleted w/ login/out, this method is initializted
    */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!)
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }


  // Sign In w/ Firebase Console
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home'])
        });
        this.setUserData(result.user);
        console.log('userData', this.userData.email)
        return this.dataObsevable.next(this.userData)
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign Up w/ Firebase
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.router.navigate(['/home'])
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }

  //Sign Out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }




  // set the the user that's been created or signed in to it's associated User Object w/ keys/values; these values exhibit the user profile
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    console.log('user data signed in', userData.email)
    return userRef.set(userData, {
      merge: true
    });
  }

  // For Auth Guard; returns true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null ? true : false)
  }

}
