import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { NavbarComponent } from "../navbar/navbar.component";
import { SharedModule } from "../shared/shared.module";
import { InspirationComponent } from "./inspiration/inspiration.component";
import { ProjectCardComponent } from "./project-detail/project-card/project-card.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectFinancialsComponent } from "./project-detail/project-financials/project-financials.component";
import { ProjectNavbarComponent } from "./project-detail/project-navbar/project-navbar.component";
import { NewProjectSubmissionComponent } from "./project-form/new-project-submission/new-project-submission.component";
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { WorkBreakdownComponent } from "./work-breakdown/work-breakdown.component";
import { WorkFormComponent } from "./work-breakdown/work-form/work-form.component";

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectFormComponent,
    NewProjectSubmissionComponent,
    InspirationComponent,
    WorkBreakdownComponent,
    ProjectNavbarComponent,
    ProjectFinancialsComponent,
    ProjectCardComponent,
    WorkFormComponent,

  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: []
})
export class ProjectModule { }
