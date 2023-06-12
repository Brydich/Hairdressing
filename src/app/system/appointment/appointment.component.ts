import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import {Record} from "../../shared/models/record.model";
import {Message} from "../../shared/models/message.model";
import {formatDate} from "@angular/common";
import {RecordService} from "../../shared/services/record.service";

export type MenuSection = {title: string, SectionInfo: Array<MenuItem>};
export type MenuItem = {title: string, price: number, duration: number, imagePath: string};

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  message: Message = {type:'', text:''};
  formAppointment!: FormGroup;
  timeAppointment = formatDate(new Date(), 'HH:mm', 'en-US');
  dateAppointmentMin = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dateAppointmentMax = formatDate(new Date().setDate(new Date().getDate() + 60), 'yyyy-MM-dd', 'en-US');
  dateAppointment = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  constructor(private userService: UserService, private router: Router, private recordService: RecordService) {}
  selectedAddres = "Москва, ул. Родионова, д. 22";
  selectedHair = "Classic";
  GetAddress(event: any) {
    this.selectedAddres = event.target.value;
  }
  ngOnInit(): void {
    this.message = new Message('success', '');
    this.formAppointment = new FormGroup({});
  }

  onSubmit(){
    const record = new Record(this.dateAppointment, this.timeAppointment, this.selectedHair, this.selectedAddres);

    this.recordService.createRecord(record).subscribe(()=>{
        this.showMessage({
          type: "success",
          text: "You have successfully signed up"
        });
        window.setTimeout(()=>{
          window.localStorage.setItem('record', JSON.stringify(record));
        }, 2000);
      });
  }
  showMessage(message: Message){
    this.message = message;

    window.setTimeout(()=>{
      this.message.text = '';
    }, 5000);
  }
  minValue:number = 0;
  maxValue:number = 1000;
  sortAscending: boolean = true;
  public activeItem!: MenuItem;


  public onSelectItem(item: MenuItem): void {
    this.activeItem = item;
    this.selectedHair = this.activeItem.title;
  }
  SwitchSort() {
    this.sortAscending = !this.sortAscending;
  }
  menu: Array<MenuSection> = [{
    title: 'Haircuts List',
    SectionInfo: [
      {title: "Haircuts Trim", price: 20, duration: 60, imagePath: "/assets/img/imgAverage.jpg"},
      {title: "Haircut", price: 19, duration: 60, imagePath: "/assets/img/imgSmall.jpg"},
      {title: "Haircuts", price: 18, duration: 60, imagePath: "/assets/img/imgAverage.jpg"},
      {title: "Classic", price: 17, duration: 60, imagePath: "/assets/img/price.jpg"},
    ]
  }, {
    title:'Beard & Mo List',
    SectionInfo: [
      {title: "Beard Trim", price: 21, duration: 60, imagePath: "/assets/img/imgSmall.jpg"},
      {title: "Beard", price: 22, duration: 60, imagePath: "/assets/img/price.jpg"},
      {title: "Mo List", price: 23, duration: 60, imagePath: "/assets/img/imgAverage.jpg"},
      {title: "Classic", price: 24, duration: 60, imagePath: "/assets/img/price.jpg"},
    ]
  }];
}
