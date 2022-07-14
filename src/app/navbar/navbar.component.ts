import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { ProjectService } from '../project/project.service';
import { User } from '../user/user';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  user: User; //subscribe to user that's logged in from authService; extract key/values for use in HTML


  constructor(private authService: AuthService) {
    this.onUserDataChange();
  }


  ngOnInit(): void {

  }

  onSignOut() {
    this.authService.signOut();

  }

  onUserDataChange() {
    this.authService.dataObsevable.subscribe((dataChange) => {
      this.user = dataChange;
      // console.log('subscribed data change', this.user.displayName);
    });
  }

}
