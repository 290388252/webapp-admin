import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public curId: number;
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(window.location.href);
    const url = window.location.href;
    this.router.navigate(['main/userDetail']);
    if (url.indexOf('userDetail') > -1) {
      this.curId = 1;
    } else if (url.indexOf('machineDetail') > -1) {
      this.curId = 2;
    } else if (url.indexOf('salesRecord') > -1) {
      this.curId = 3;
    } else if (url.indexOf('replenishmentDetail') > -1) {
      this.curId = 4;
    } else {
      this.curId = 1;
    }
  }
  selected(flag) {
    this.curId = flag;
  }
}
