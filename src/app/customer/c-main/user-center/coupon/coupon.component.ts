import {Component, OnInit} from '@angular/core';
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
  public overDue: boolean;
  public effective: boolean;
  public used: boolean;
  // public couponGet: boolean;
  public overDueList = [];
  public effectiveList = [];
  public usedList = [];
  // public couponGetList = [];
  public specialGoodsList = [];
  public status;
  public openId;
  public imgUrl = this.appProperties.shopImgUrl;
  specialModal = false;
  private token;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = urlParse(window.location.href)['token'];
    if (this.token === null || this.token === undefined || this.token === 'undefined') {
      if (urlParse(window.location.search)['coupon'] === 1 || urlParse(window.location.search)['coupon'] === '1') {
        this.token = getToken();
      } else {
        this.appService.getData(this.appProperties.adminGetShopTokenUrl, null).subscribe(
          data => {
            if (data.status === 1) {
              window.location.href = data.returnObject.url;
            } else if (data.status === 2) {
              this.token = data.returnObject.token;
              this.coupon(2);
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    this.effective = true;
    this.effective ? this.empty = false : this.empty = true;
    if (this.token !== undefined) {
      this.coupon(2);
    }
  }

  choose(flag) {
    if (flag === 3) {
      // 过期
      this.overDue = true;
      this.effective = false;
      this.used = false;
      this.coupon(4);
    } else if (flag === 2) {
      // 已使用
      this.overDue = false;
      this.effective = false;
      this.used = true;
      this.coupon(3);
    } else if (flag === 1) {
      // 未使用
      this.overDue = false;
      this.effective = true;
      this.used = false;
      this.coupon(2);
    }
  }

  coupon(state) {
    this.appService.getAliData(this.appProperties.shopFrontCouponMyListUrl, {state: state}, this.token).subscribe(
      data => {
        this.status = data.status;
        if (data.returnObject !== null) {
          this.openId = data.returnObject.openId;
        }
        if (state === 4) {
          if (this.status === 1) {
            this.overDueList = data.returnObject;
          }
        } else if (state === 2) {
          if (this.status === 1) {
            this.effectiveList = data.returnObject;
          }
        } else if (state === 3) {
          if (this.status === 1) {
            this.usedList = data.returnObject;
          }
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

  turnToBind(item, useWhere) {
    let isShow;
    if (item === 1) {
      // 特殊商品
      if (useWhere === 1) {
        //  机器商品
        isShow = false;
        return isShow;
      } else {
        isShow = true;
        return isShow;
      }
    } else if (item === 0) {
      // 全品类
      isShow = false;
      return isShow;
    }
  }

  pickCard(item) {
    this.appService.postAliData(this.appProperties.shopFrontCouponAddCouponToCustomerUrl + '?couponId=' + item.id, '', this.token).subscribe(
      data => {
        this.coupon(1);
      },
      error => {
        console.log(error);
      }
    );
  }

  useCard(id) {
    if (id === 1 || id === '1') {
      this.router.navigate(['cMain/cardMap']);
    } else if (id === 2 || id === '2') {
      this.router.navigate(['cLogin'], {
        queryParams: {
          card: 1,
          openId: this.openId
        }
      });
    }
  }

  useSpecialCard(id): void {
    this.specialModal = true;
    this.appService.postAliData(this.appProperties.shopSpecialGoodsUrl + '?couponId=' + id, '', this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.specialGoodsList = data.returnObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // 图片格式
  trunImg(list) {
    if (list.indexOf(',') !== -1) {
      const imgList = list.split(',');
      list = imgList[0];
      return list;
    } else {
      return list;
    }
  }

  addCar(item) {
    this.appService.postAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, this.token).subscribe(
      data => {
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }

  useSpecialCardHide(): void {
    this.specialModal = false;
  }

  toDate(date) {
    return new Date(date).getFullYear() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getDate();
  }
}
