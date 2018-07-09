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
  public empty: boolean;
  public unUsed: boolean;
  public unEffective: boolean;
  public effective: boolean;
  public couponList = [];
  public couponUnEffectiveList = [];
  public couponEffectiveList = [];
  private token;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
    this.token = getToken();
    this.unEffective = true;
    this.unEffective ? this.empty = false : this.empty = true;
    this.coupon(2);
  }
  choose(flag) {
    if (flag === 1) {
      this.unUsed = true;
      this.unEffective = false;
      this.effective = false;
      this.coupon(1);
    } else if (flag === 2) {
      this.unUsed = false;
      this.unEffective = true;
      this.effective = false;
      this.coupon(2);
    } else if (flag === 3) {
      this.unUsed = false;
      this.unEffective = false;
      this.effective = true;
      this.coupon(3);
    }
  }
  coupon(state) {
    this.appService.getAliData(this.appProperties.shopFrontCouponMyListUrl, {state: state}, this.token).subscribe(
      data => {
        console.log(data);
        if (state === 1) {
          this.couponList = data.returnObject;
        } else if (state === 2) {
          this.couponEffectiveList = data.returnObject;
        } else if (state === 3) {
          this.couponUnEffectiveList = data.returnObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  text(item) {
    return item.money === 0 ? '固定减扣券' : '满' + item.money + '元使用';
  }
  textTwo(item) {
    return item.money === 0 ? '可直接使用券' : item.money + '元套餐抵扣券';
  }
  ok() {
  }
  pickCard(item) {
    this.appService.postAliData(this.appProperties.shopFrontCouponAddCouponToCustomerUrl + '?couponId=' + item.id, '', this.token).subscribe(
      data => {
        console.log(data);
        this.coupon(1);
      },
      error => {
        console.log(error);
      }
    );
  }
  useCard() {
    this.router.navigate(['cMain/firstPage']);
  }
  toDate(date) {
    return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate();
  }
}
