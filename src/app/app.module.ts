import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaintenanceItemComponent } from './maintenance/maintenance-item/maintenance-item.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { FinancialSummaryComponent } from './financials/financial-summary/financial-summary.component';
import { RoomCarouselComponent } from './rooms/room-carousel/room-carousel.component';
import { ProjectWishComponent } from './project/project-wish/project-wish.component';
import { HomeSummaryComponent } from './home-summary/home-summary.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, } from '@angular/common/http';
import { ProjectModule } from './project/project.module';
import { RoomsModule } from './rooms/rooms-module';
import { EnterHomeComponent } from './enter-home/enter-home.component';
import { LoanAmorizationFormComponent } from './financials/loan-amortization/loan-amorization-form-component';
import { SharedModule } from './shared/shared.module';
// Firebase

import { AngularFireModule } from '@angular/fire/compat'; //This is Firebase
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; //This is Firestore


// End Firebase

import { LoanDetailsComponent } from './financials/loan-amortization/loan-details/loan-details.component';
import { FinancialHomeComponent } from './financials/financial-home/financial-home.component';
import { AuthService } from './authentication/auth.service';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UpdateUserComponent } from './user/user-profile/update-user/update-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MaintenanceItemComponent,
    MaintenanceListComponent,
    FinancialSummaryComponent,
    RoomCarouselComponent,
    ProjectWishComponent,
    HomeSummaryComponent,
    EnterHomeComponent,
    LoanAmorizationFormComponent,
    LoanDetailsComponent,
    FinancialHomeComponent,
    SignInComponent,
    SignUpComponent,
    UserProfileComponent,
    UpdateUserComponent,

  ],
  imports: [
    BrowserModule, //browser module can only be imported once
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, //required for reactive form approach
    HttpClientModule,
    ProjectModule,
    RoomsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
