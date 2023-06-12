import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { BarberComponent } from "./barber/barber.component";
import {AppointmentComponent} from "./appointment/appointment.component";
import {PriceComponent} from "./price/price.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {AdminComponent} from "./admin/admin.component";


const routes: Routes = [
  {path: 'system', component: SystemComponent,canActivate: [AuthGuard], children:[ //canActivate: [AuthGuard]
    {path: 'barber', component: BarberComponent},
    {path: 'appointment', component: AppointmentComponent},
    {path: 'price', component: PriceComponent},
  ]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]} // canActivate: [AuthGuard]
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
