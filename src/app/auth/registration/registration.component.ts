import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "src/app/shared/models/user.model";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {Message} from "../../shared/models/message.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  message!: Message;
  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) {}
  ngOnInit(): void {
    this.message = new Message("Danger", '');

    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }
  showMessage(message: Message){
    this.message = message;

    window.setTimeout(()=>{
      this.message.text = '';
    }, 5000);
  }
  onSubmit() {
    const{name, email, password} = this.form.value;
    const user = new User(name, email,password);

    this.userService.createUser(user)
      .subscribe(()=>{
        this.showMessage({
          type: "success",
          text: "You have successfully registered"
        });
        this.authService.login();
        window.setTimeout(()=>{
          window.localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['../../system/barber'], {
            queryParams:{
              canLogin: true
            }
          });
        }, 2000);
      });
  }



}
