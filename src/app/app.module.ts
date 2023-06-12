import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/services/user.service';
import { AuthService } from "./shared/services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import {RecordService} from "./shared/services/record.service";




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    SystemModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    AuthService,
    RecordService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
