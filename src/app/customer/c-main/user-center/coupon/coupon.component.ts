import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  array = [
    'http://119.23.233.123:6662/ys_admin/files/0.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000080.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000081.png',
    'http://119.23.233.123:6662/ys_admin/files/0.png'
  ];
  public empty: boolean;
  public unUsed: boolean;
  public unEffective: boolean;
  public effective: boolean;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
    this.unUsed = true;
    if (this.unUsed) {
      this.empty = false;
    } else {
      this.empty = true;
    }
    console.log(this.unUsed);
    console.log(this.empty);
  }
  choose(flag) {
    if (flag === 1) {
      this.unUsed = true;
      this.unEffective = false;
      this.effective = false;
    } else if (flag === 2) {
      this.unUsed = false;
      this.unEffective = true;
      this.effective = false;
    } else if (flag === 3) {
      this.unUsed = false;
      this.unEffective = false;
      this.effective = true;
    }
  }
  ok() {
  }
  useCard() {}
}
