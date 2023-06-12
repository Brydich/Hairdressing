import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { BarberComponent } from './barber/barber.component';
import { PriceComponent } from './price/price.component';
import { AppointmentComponent } from './appointment/appointment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterByRangePipe} from './appointment/filter-by-range.pipe';
import {toggleActiveDirective} from "../shared/directives/toggle-active";
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    SystemComponent,
    BarberComponent,
    PriceComponent,
    AppointmentComponent,
    FilterByRangePipe,
    toggleActiveDirective,
    AdminComponent,
  ],
    imports: [
      BrowserModule,
      SystemRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
  providers: []
})
export class SystemModule { }
