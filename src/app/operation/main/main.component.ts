import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public curId: number;
  constructor() { }

  ngOnInit() {
    this.curId = 1;
  }
  selected(flag) {
    this.curId = flag;
  }
}
