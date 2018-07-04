import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  array = [
    'http://119.23.233.123:6662/ys_admin/files/0.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000080.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000081.png',
    'http://119.23.233.123:6662/ys_admin/files/0.png'
  ];
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1MzA2NzY4NzZ9.m2B-ryVZhqwOEqC-9fm42M00oLvF_BaXxHlWw56ZdDiwoKZ2TmLxymF_bb8Wj448y5XrDKBYA1K9CGd7Nh6PKg';
  constructor( @Inject('firstPage') private firstPageService, private appProperties: AppProperties) { }

  ngOnInit() {
    this.list = this.firstPageService.showGoods(this.token);
    console.log(this.list);
  }
}
