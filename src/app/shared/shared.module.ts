import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { ClickOutDirective } from "./click-out.directive";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { HoverTextDirective } from './hover-text.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ClickOutDirective,
    DropdownDirective,
    HoverTextDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    ClickOutDirective,
    DropdownDirective,
    HoverTextDirective,
    CommonModule
  ]
})
export class SharedModule{ }
