import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoomComponent } from "./room/room.component";

const roomsRoutes: Routes = [
  { path: "rooms", component: RoomComponent}
]

@NgModule({
  imports: [RouterModule.forChild(roomsRoutes)],
  exports: [RouterModule]
})

export class RoomRoutingModule{}
