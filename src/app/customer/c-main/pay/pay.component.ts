import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

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
  public radioValue;
  public locationId;

  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router ) {
  }

  ngOnInit() {
    this.token = getToken();
    this.appService.postAliData(this.appProperties.shopAddressSelectUrl, '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 0) {
          alert('请先填写地址');
          this.router.navigate(['cMain/newAddress']);
        } else {
          this.name = data.returnObject[0]['name'];
          this.receiver = data.returnObject[0]['receiver'];
          this.phone = data.returnObject[0]['phone'];
          this.locationId = data.returnObject[0]['id'];
          this.showShopCarPrice();
          // this.couponSum();
        }
      },
      error => {
        console.log(error);
      }
    );
    this.radioValue = '1';
  }
  print(val) {
    this.radioValue = val;
    console.log(this.radioValue);
  }
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
    if (this.couponLength !== 0) {
      this.isCoupon = true;
    }
  }
  choiceCoupon(couponId) {

    this.couponId = couponId;
  }
  CouponCancel(): void {
    console.log('Button ok clicked!');
    this.isCoupon = false;
  }

  CouponOk(): void {
    console.log('ok');
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
        alert(data2.message);
        if (data2.returnObject.orderState !== 10001) {
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
          this.router.navigate(['cMain/payFinish']);
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
            window.location.href = 'http://webapp.youshuidaojia.com/cMain/userCenter';
            // this.router.navigate(['cMain/shopCar']);
            console.log('支付成功');
          } else {
            alert('支付失败');
          }
        },
        cancel: (res) => {
          alert('您取消了支付');
          // 支付取消
        },
        error: (res) => {
          alert('出错了，请联系优水到家管理员');
        }
      });
    });
  }

  showShopCarPrice() {
    this.appService.postAliData(this.appProperties.shoppingCarUrl, '', this.token).subscribe(
      data => {
        console.log(data);
        this.totalPrice = 0;
        this.data = data.returnObject;
        this.data.forEach(item => {
          item.pic = item.pic.split(',')[0];
          this.totalPrice += item.price * item.num;
          this.num += item.num;
          this.idList.push(item.itemId);
          this.shopCartId.push(item.id);
        });
        console.log(this.data);
        console.log(this.totalPrice);
        console.log(this.idList);
        console.log(this.shopCartId.join(','));
        this.appService.postAliData(this.appProperties.shopAddCouponUrl, this.idList, this.token).subscribe(
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
              console.log('length');
              console.log(this.couponLength);
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
