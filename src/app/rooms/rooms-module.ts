import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { RoomComponent } from "./room/room.component";
import { RoomRoutingModule } from "./rooms-routing.module";

@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [AppRoutingModule, RoomRoutingModule, SharedModule],
  exports: []
})

export class RoomsModule{}
