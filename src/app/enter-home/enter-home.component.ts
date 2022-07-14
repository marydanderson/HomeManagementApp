import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApiService } from '../financials/loan-api.service';

@Component({
  selector: 'app-enter-home',
  templateUrl: './enter-home.component.html',
  styleUrls: ['./enter-home.component.css']
})

export class EnterHomeComponent implements OnInit {
  isLoginMode = false;
  isSignupMode = false;
  loanData;
  @ViewChild('toggleButton', {read: ElementRef}) toggleButton: ElementRef;
  @ViewChild('authForm', {read: ElementRef}) authForm: ElementRef;


  constructor(private router: Router) {
   };

  ngOnInit(): void {

  }

  onLoginClick() {
    this.isSignupMode = false;
    this.isLoginMode = !this.isLoginMode
  }

  btnClickRouteHome() {
    console.log('route home')
    this.router.navigateByUrl('/welcomehome');
  }

  onSignupClick() {
    this.isLoginMode = false;
    this.isSignupMode = !this.isSignupMode

  }



}
