import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-main',
  templateUrl: './c-main.component.html',
  styleUrls: ['./c-main.component.css']
})
export class CMainComponent implements OnInit {
  public curId: number;
  constructor() { }

  ngOnInit() {
    console.log(window.location.href);
    const url = window.location.href;
    if (url.indexOf('firstPage') > -1) {
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
