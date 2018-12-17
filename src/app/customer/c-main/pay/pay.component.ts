import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public list;
  public idList = [];
  public couponList = [];
  public shopCartId = [];
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public totalPrice;
  public num = 0;
  public data;
  public name;
  public receiver;
  public phone;
  public orderId: number;
  public isCoupon = false;
  public couponId;
  public couponLength;
  public radioValue = '2';
  public locationId;
  public ids: string;
  public type: string;
  public reduceMoney = 0;
  public totalMoney = 0;
  public noneAddress;
  public showAddress;

  constructor(private appService: AppService, private appProperties: AppProperties,
              private router: Router, private routeInfo: ActivatedRoute, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.routeInfo.queryParams.subscribe(
      params => {
        this.ids = params.ids;
        this.type = params.type;
      }
    );

    if (getToken() === null || getToken() === undefined) {
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&' +
      //   'redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&' +
      //   'scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';

    } else {
      this.token = getToken();
    }

    this.appService.postAliData(this.appProperties.shopAddressShow, {'ids': this.ids}, this.token).subscribe(
      data => {
        if (data.status === 0) {
          this.showAddress = true;
          this.appService.postAliData(this.appProperties.shopAddressSelectUrl, '', this.token).subscribe(
            data1 => {
              if (data1.returnObject === null || data1.returnObject === [] || data1.returnObject === undefined) {
                this.noneAddress = true;
              } else {
                this.noneAddress = false;
                this.name = data1.returnObject[0]['name'];
                this.receiver = data1.returnObject[0]['receiver'];
                this.phone = data1.returnObject[0]['phone'];
                this.locationId = data1.returnObject[0]['id'];
              }
            },
            error => {
              console.log(error);
            }
          );
        } else if (data.status === 1) {
          this.showAddress = false;
        }
        this.showShopCarPrice();
      },
      error => {
        console.log(error);
      }
    );

  }

  //
  goTo() {
    this.router.navigate(['cMain/newAddress'], {
      queryParams: {
        type: 4,
        idList: this.ids,
        isAdd: 1,
        pay: this.type
      }
    });

  }

  // print(val) {
  //   this.radioValue = val;
  //   console.log(this.radioValue);
  // }
  /*couponSum() {
    console.log(this.idList);
    this.appService.postAliData(this.appProperties.shopAddCouponUrl, this.idList, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 0) {
          this.couponLength = 0;
        } else if (data.status === 1) {
          this.couponList = data.returnObject;
          this.couponId = undefined;
          if (this.couponList !== null) {
            this.couponLength = this.couponList.length;
          }
          console.log('length');
          console.log(this.couponLength);
        }
      },
      error => {
        console.log(error);
      }
    );
  }*/
  selectCoupon(): void {
    if (this.couponLength !== 0
    ) {
      this.isCoupon = true;
    }
  }

  choiceCoupon(item) {
    this.reduceMoney = 0;
    console.log(item);
    this.couponId = item.id;
    this.reduceMoney = item.deductionMoney;
  }

  CouponCancel(): void {
    console.log('Button ok clicked!');
    this.isCoupon = false;
  }

  CouponOk(): void {
    console.log('ok');
    this.totalMoney = this.totalPrice - this.reduceMoney;
    this.isCoupon = false;
  }

  button(flag) {
    if (flag === 1) {
      this.pay();
      // console.log(this.orderId);
    } else if (flag === 2) {
      history.back();
    }
  }

  showConfirm(): void {
    this.modalService.info({
      nzContent: '<b>您取消了支付</b>',
      nzCancelText: '忍痛放弃',
      nzOkText: '继续支付',
      nzOnOk: () => this.pay()
    });
  }

  pay() {
    this.appService.postAliData(this.appProperties.shopStoreOrderAddUrl, {
      product: this.shopCartId.join(','),
      addressId: this.locationId,
      distributionModel: this.radioValue,
      coupon: this.couponId,
      payType: 1,
    }, this.token).subscribe(
      data2 => {
        console.log(data2);
        // if (data2.returnObject.state !== 10001) {
        if (data2.status === 0) {
          alert(data2.message);
          this.router.navigate(['cMain/newAddress'], {
            queryParams: {
              type: 4,
              idList: this.ids,
              isAdd: 1,
              pay: this.type
            }
          });
          return;
        } else if (data2.returnObject.orderState !== 10001) {
          this.orderId = data2.returnObject.orderId;
          this.appService.getAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
            orderId: this.orderId,
            url: 'http://webapp.youshuidaojia.com/cMain/pay'
          }, this.token).subscribe(
            data4 => {
              console.log(data4);
              if (data4.status === 2) {
                window.location.href = data4.returnObject;
              } else {
                if (typeof(WeixinJSBridge) === 'undefined') {
                  this.onBridgeUndefindeReady(data4);
                } else {
                  this.onBridgeReady(data4);
                }
              }
            },
            error => {
              console.log(error);
            }
          );
        } else {
          // alert('支付完成！');
          // this.router.navigate(['cMain/shopCar']);
          this.token = getToken();
          // this.router.navigate(['cMain/payFinish']);
          window.location.href = 'http://webapp.youshuidaojia.com/cMain/payFinish?' + 'token=' + this.token;
        }
      },
      error2 => {
        console.log(error2);
      }
    );

  }

  onBridgeUndefindeReady(data) {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', () => {
        this.test(data);
      }, false);
    } else if (document['attachEvent']) {
      document['attachEvent']('WeixinJSBridgeReady', () => {
        this.test(data);
      });
      document['attachEvent']('onWeixinJSBridgeReady', () => {
        this.test(data);
      });
    }
  }

  // 调用微信支付接口
  onBridgeReady(data) {
    this.test(data);
  }

  // 调用微信支付接口测试
  test(data) {
    wx.config({
      debug: false,
      appId: data.config.appId,
      timestamp: data.config.timestamp,
      nonceStr: data.config.nonceStr,
      signature: data.config.signature,
      jsApiList: ['checkJsApi',
        'chooseWXPay',
      ]
    });
    wx.ready(() => {
      wx.chooseWXPay({
        debug: false,
        timestamp: data.payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.payInfo.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.payInfo.package,
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.payInfo.sign, // 支付签名
        success: (res) => {
          if (res.errMsg === 'chooseWXPay:ok') {
            // window.location.href = 'http://webapp.youshuidaojia.com/cMain/userCenter';
            // this.router.navigate(['cMain/shopCar']);
            this.token = getToken();
            // this.router.navigate(['cMain/payFinish']);
            window.location.href = 'http://webapp.youshuidaojia.com/cMain/payFinish?' + 'token=' + this.token;
          } else {
            alert('支付失败');
          }
        },
        cancel: (res) => {
          // alert('您取消了支付');
          this.modalService.info({
            nzContent: '<b>您取消了支付</b>',
            nzCancelText: '忍痛放弃',
            nzOkText: '继续支付',
            nzOnOk: () => this.pay()
          });
          // 支付取消
        },
        error: (res) => {
          alert('出错了，请联系优水到家管理员');
        }
      });
    });
  }

  showShopCarPrice() {
    console.log(this.type);
    this.appService.postAliData(this.appProperties.shoppingCarUrl, {
      ids: this.ids,
      type: this.type
    }, this.token).subscribe(
      data => {
        console.log(data);
        this.totalPrice = 0;
        this.data = data.returnObject;
        this.data.forEach(item => {
          item.pic = item.pic.split(',')[0];
          this.totalPrice += item.price * item.num;
          this.totalMoney = this.totalPrice;
          this.num += item.num;
          this.idList.push(item.itemId);
          this.shopCartId.push(item.id);
        });
        this.appService.getAliData(this.appProperties.shopCouponListUrl, {state: 5}, this.token).subscribe(
          data2 => {
            console.log(data2);
            if (data2.status === 0) {
              this.couponLength = 0;
            } else if (data2.status === 1) {
              this.couponList = data2.returnObject;
              this.couponId = undefined;
              if (this.couponList !== null) {
                this.couponLength = this.couponList.length;
              }
            }
          },
          error2 => {
            console.log(error2);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  toFixed(num) {
    return Math.round(num * 100) / 100;
  }
}
