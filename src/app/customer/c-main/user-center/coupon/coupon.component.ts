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
  public unUsed: boolean;
  public unEffective: boolean;
  public effective: boolean;
  public couponList = [];
  public couponUnEffectiveList = [];
  public couponEffectiveList = [];
  public specialGoodsList = [];
  public status;
  public openId;
  public imgUrl = this.appProperties.shopImgUrl;
  specialModal = false;
  isConfirmLoading = false;
  private token;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = urlParse(window.location.href)['token'];
    if (this.token === null || this.token === undefined || this.token === 'undefined') {
      this.token = getToken();
    }
    this.unEffective = true;
    this.unEffective ? this.empty = false : this.empty = true;
    this.coupon(2);
  }

  choose(flag) {
    if (flag === 1) {
      this.unUsed = true;
      this.unEffective = false;
      this.effective = false;
      this.coupon(4);
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
        this.status = data.status;
        this.openId = data.returnObject.openId;
        if (state === 4) {
          if (this.status === 1) {
            this.couponList = data.returnObject;
          } else if (this.status === 2) {
            this.couponList = data.returnObject.couponList;
          }
        } else if (state === 2) {
          if (this.status === 1) {
            this.couponEffectiveList = data.returnObject;
          } else if (this.status === 2) {
            this.couponEffectiveList = data.returnObject.couponList;
          }
          // console.log('ok');
          // if (this.couponEffectiveList.length) {
          //   for (let i = 0; i < this.couponEffectiveList.length;i++) {
          //     if (data.returnObject[i].quantity) {
          //       if (data.returnObject[0].quantity > 0) {
          //         console.log(data.returnObject[0].quantity);
          //         console.log(data.returnObject[0].quantity > 0);
          //         for () {
          //
          //         }
          //       }
          //     }
          //   }
          //
          // }
        } else if (state === 3) {
          if (this.status === 1) {
            this.couponUnEffectiveList = data.returnObject;
          } else if (this.status === 2) {
            this.couponUnEffectiveList = data.returnObject.couponList;
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
        console.log(data);
        this.coupon(1);
      },
      error => {
        console.log(error);
      }
    );
  }

  useCard(id) {
    if (id === 1 || id === '1') {
      this.router.navigate(['cMain/firstPage']);
    } else if (id === 2 || id === '2') {
      this.router.navigate(['cLogin'], {
        queryParams: {
          card: 1,
          openId: this.openId
        }});
    }
  }

  useSpecialCard(id): void {
    this.specialModal = true;
    console.log(id);
    this.appService.postAliData(this.appProperties.shopSpecialGoodsUrl + '?couponId=' + id, '', this.token).subscribe(
      data => {
        console.log(data);
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
    // console.log(list);
    if (list.indexOf(',') !== -1) {
      const imgList = list.split(',');
      list = imgList[0];
      // console.log(list);
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
        console.log(data);
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
    return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate();
  }
}
