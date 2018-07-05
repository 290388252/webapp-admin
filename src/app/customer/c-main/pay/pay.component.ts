import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  array = [
    'http://119.23.233.123:6662/ys_admin/files/0.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000080.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000081.png',
    'http://119.23.233.123:6662/ys_admin/files/0.png'
  ];
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  constructor(private appProperties: AppProperties, private router: Router) { }

  ngOnInit() {
    console.log(this.list);
  }
  button(flag) {
    if (flag === 1) {
      console.log('pay');
    } else if (flag === 2) {
      history.back();
    }
  }
}
