import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Record} from "../shared/models/record.model";
import {Message} from "../shared/models/message.model";
import {RecordService} from "../shared/services/record.service";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  //==============================================
  formPopup!: FormGroup;
  message: Message = {type:'', text:''};
  address: string = 'Москва, ул. Родионова, д. 22';
  hair = "Classic";
  time = formatDate(new Date(), 'HH:mm', 'en-US');
  date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateMin = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateMax = formatDate(new Date().setDate(new Date().getDate() + 60), 'yyyy-MM-dd', 'en-US');
  FormOpen: boolean = false;

  targetFormOpen(){
    this.FormOpen = !this.FormOpen;
  }
  GetAddress(event: any) {
    this.address = event.target.value;
  }
  showMessage(message: Message){
    this.message = message;

    window.setTimeout(()=>{
      this.message.text = '';
    }, 5000);
  }
  submitForm() {
    const record = new Record(this.date, this.time, this.hair, this.address);
    console.log(record);
    this.recordService.createRecord(record).subscribe(()=>{
      this.showMessage({
        type: "success",
        text: "Поздравляем! Вы успешно записались."
      });
      window.setTimeout(()=>{
        window.localStorage.setItem('record', JSON.stringify(record));
        this.FormOpen = false;
      }, 2000);
    });
  }

  //==============================================



  user?: User;
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private recordService: RecordService) {}

  ngOnInit(): void {
    this.message = new Message('success', '');
    this.formPopup = new FormGroup({});
    if (localStorage.getItem("user") != null) {
      // @ts-ignore
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }
  public activeClass: string = '';
  ToggleClass() {
    if (this.activeClass == "_active") {
      this.activeClass = '';
    } else {
      this.activeClass = '_active';
    }
  }
  // Выход из аккаунта
  onLogout () {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  deleteAccount() {
    // @ts-ignore
    this.userService.deleteUser(this.user?.email);
  }

}
