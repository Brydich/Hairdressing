import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  navigateTo() {
    this.router?.navigate(['../../system/appointment'], {});
  }
}
