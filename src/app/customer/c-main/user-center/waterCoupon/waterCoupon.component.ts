import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './waterCoupon.component.html',
  styleUrls: ['./waterCoupon.component.css']
})
export class WaterCouponComponent implements OnInit {
  public empty: boolean;
  public unUsed: boolean;
  public used: boolean;
  public pastDue: boolean;
  // public couponGet: boolean;
  public unUsedList = [];
  public usedList = [];
  public pastDueList = [];
  // public couponGetList = [];
  public imgUrl = this.appProperties.shopImgUrl;
  private token;
  public showList;
  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.showList = false;
    this.token = urlParse(window.location.href)['token'];
    if (this.token === null || this.token === undefined || this.token === 'undefined') {
      if (urlParse(window.location.search)['coupon'] === 1 || urlParse(window.location.search)['coupon'] === '1') {
        this.token = getToken();
        console.log(this.token);
      } else {
        this.appService.getData(this.appProperties.adminGetShopTokenUrl, null).subscribe(
          data => {
            console.log(data);
            if (data.status === 1) {
              window.location.href = data.returnObject.url;
            } else if (data.status === 2) {
              this.token = data.returnObject.token;
              this.coupon(1);
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    console.log(this.token);
    this.unUsed = true;
    this.unUsed ? this.empty = false : this.empty = true;
    if (this.token !== undefined) {
      this.coupon(1);
    }
  }

  choose(flag) {
    if (flag === 1) {
      this.unUsed = true;
      this.used = false;
      this.pastDue = false;
      this.coupon(1);
    } else if (flag === 2) {
      this.unUsed = false;
      this.used = true;
      this.pastDue = false;
      this.coupon(2);
    } else if (flag === 3) {
      this.unUsed = false;
      this.used = false;
      this.pastDue = true;
      this.coupon(3);
    }
  }

  coupon(state) {
    this.appService.postAliData(this.appProperties.shoppingWaterCouponUrl, {state: state}, this.token).subscribe(
      data => {
        console.log(data);
        if (state === 1) {
          this.showList = true;
          this.unUsedList = data.returnObject;
        } else if (state === 2) {
          this.showList = true;
          this.usedList = data.returnObject;
        } else if (state === 3) {
          this.showList = true;
          this.pastDueList = data.returnObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openInstructions(id) {
    if (this.unUsedList !== null) {
      for (let i = 0; i <= this.unUsedList.length; i++) {
        if (id === i) {
          this.unUsedList[i]['isShow'] = !this.unUsedList[i]['isShow'];
        }
      }
    }
  }
}
