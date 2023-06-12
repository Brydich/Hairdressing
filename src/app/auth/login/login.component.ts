import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs';

import { Message } from "../../shared/models/message.model";
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppointmentComponent} from "../../system/appointment/appointment.component";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  message!: Message;
  adminEmail: string = "a@a";
  navigateStart: string = "../../system/barber";
  navigateAdmin: string = "../../admin";
  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) {}
  showMessage(message: Message){
    this.message = message;

    window.setTimeout(()=>{
      this.message.text = '';
    }, 5000);
  }
  ngOnInit(): void {
    this.message = new Message("Danger", '');

    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }
  private LogIn(navigateString: string, user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.authService.login();

    window.setTimeout(()=>{
      this.router.navigate([navigateString], {
        queryParams:{
          canLogin: true
        }
      });
    }, 2000);
  }
  onSubmit(){
    const formData = this.form.value;

    this.userService.getUsers(formData.email).subscribe((user: User)=>{
        if (user){
          if(user.password===formData.password){
            if (formData.email == this.adminEmail) {
              this.showMessage({
                type: "success",
                text: "Welcome, Admin. Let's do something wrong)"
              });
              this.LogIn(this.navigateAdmin, user);
            } else {
              this.showMessage({
                type: "success",
                text: "You are successfully logged in"
              });
              this.LogIn(this.navigateStart, user);
            }
        } else{ // Uncorrect password
            this.showMessage({
              type: "Danger",
              text: "Incorrect password"
            });
        }
      } else{
          this.showMessage({
            type: "Danger",
            text: "This user is not found"
          });
        }
      });

  }

}
