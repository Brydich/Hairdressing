import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-barber',
  templateUrl: './barber.component.html',
  styleUrls: ['./barber.component.scss']
})
export class BarberComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  navigateTo() {
    this.router?.navigate(['../../system/appointment'], {});
  }
}
