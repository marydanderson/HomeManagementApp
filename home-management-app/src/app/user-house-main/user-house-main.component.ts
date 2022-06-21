import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-house-main',
  templateUrl: './user-house-main.component.html',
  styleUrls: ['./user-house-main.component.css']
})
export class UserHouseMainComponent implements OnInit {

  isAuthenticated = false;
  navbarDisplay = false

  constructor(private router: Router) {
   }

  ngOnInit(): void {
    console.log(' route snapshot:', this.router.url)
    if (this.router.url === '/dashboard/summary') {
      this.navbarDisplay = false
    }
    else {
      this.navbarDisplay = true;
    }
  }


}
