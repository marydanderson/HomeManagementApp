import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { ProjectService } from '../project/project.service';
import { User } from '../user/user';

@Component({
  selector: 'app-home-summary',
  templateUrl: './home-summary.component.html',
  styleUrls: ['./home-summary.component.css']
})
export class HomeSummaryComponent implements OnInit{
  isAuthenticated = false //default value of page [lockout] if user isn't logged in

  user: User; //subscribe to user that's logged in from authService; extract key/values for use in HTML


  constructor(private authService: AuthService, private projectService: ProjectService) {
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
      console.log('subscribed data change', this.user.displayName);
    });
  }

}
