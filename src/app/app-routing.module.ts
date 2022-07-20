import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeSummaryComponent } from "./home-summary/home-summary.component";
import { MaintenanceListComponent } from "./maintenance/maintenance-list/maintenance-list.component";
import { EnterHomeComponent } from "./enter-home/enter-home.component";
import { ProjectListComponent } from "./project/project-list/project-list.component";
import { InspirationComponent } from "./project/inspiration/inspiration.component";
import { WorkBreakdownComponent } from "./project/work-breakdown/work-breakdown.component";
import { ProjectCardComponent } from "./project/project-detail/project-card/project-card.component";
import { FinancialHomeComponent } from "./financials/financial-home/financial-home.component";
import { LoanAmorizationFormComponent } from "./financials/loan-amortization/loan-amorization-form-component";
import { SignUpComponent } from "./authentication/sign-up/sign-up.component";
import { SignInComponent } from "./authentication/sign-in/sign-in.component";
import { AuthGuard } from "./authentication/auth.guard";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";
import { UpdateUserComponent } from "./user/user-profile/update-user/update-user.component";
import { ProjectDetailComponent } from "./project/project-detail/project-detail.component";
import { ProjectFinancialsComponent } from "./project/project-detail/project-financials/project-financials.component";
import { ProjectFormComponent } from "./project/project-form/project-form.component";
import { NewProjectSubmissionComponent } from "./project/project-form/new-project-submission/new-project-submission.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RoomComponent } from "./rooms/room/room.component";


const appRoutes: Routes = [
  { path: "", component: EnterHomeComponent, children: [
      { path: "signup", component: SignUpComponent },
      { path: "login", component: SignInComponent },
    ]
  },
  {
    path: "home", component: HomeSummaryComponent, canActivate: [AuthGuard]
  },
  {
    path: "nav", component: NavbarComponent, canActivate: [AuthGuard], children: [
      { path: "projects", component: ProjectListComponent },
      { path: "project-details/:id", component: ProjectDetailComponent, children: [
        { path: "inspiration", component: InspirationComponent},
        { path: "work-breakdown", component: WorkBreakdownComponent},
        { path: "financials", component: ProjectFinancialsComponent},
        { path: "general", component: ProjectCardComponent }
      ]},
      {path: "add-new-project", component: ProjectFormComponent, children: [
        {path: "project-submission", component: NewProjectSubmissionComponent}
      ]},
      { path: "inspiration", component: InspirationComponent},
      { path: "financials", component: FinancialHomeComponent },
      { path: "loan-form", component: LoanAmorizationFormComponent},
      { path: "general", component: ProjectCardComponent },
      { path: "maintenance", component: MaintenanceListComponent },
      { path: "rooms", component: RoomComponent },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
