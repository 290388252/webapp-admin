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
    '../../../../assets/main/raw_1529043263.png',
    '../../../../assets/main/raw_1529043326.png',
    '../../../../assets/main/raw_1529043367.png',
    '../../../../assets/main/raw_1529043422.png'
  ];
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  constructor( @Inject('firstPage') private firstPageService, private appProperties: AppProperties) { }

  ngOnInit() {
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
      document.cookie = 'shopToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    }
    console.log(urlParse(window.location.search)['token']);
    this.list = this.firstPageService.showGoods(getToken());
    console.log(this.list);
  }
}
