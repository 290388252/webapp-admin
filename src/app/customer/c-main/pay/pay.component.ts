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
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public totalPrice;
  public num = 0;
  public data;
  public name;
  public receiver;
  public phone;
  public orderId: number;

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
          this.showShopCarPrice();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  button(flag) {
    if (flag === 1) {
      this.pay(this.orderId);
      // console.log(this.orderId);
    } else if (flag === 2) {
      history.back();
    }
  }

  pay(orderId) {
        this.appService.postAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
          orderId: orderId,
        }, this.token).subscribe(
          data4 => {
            console.log(data4);
            if (typeof(WeixinJSBridge) === 'undefined') {
              this.onBridgeUndefindeReady(data4);
            } else {
              this.onBridgeReady(data4);
            }
          },
          error => {
            console.log(error);
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
            alert('支付成功');
            this.router.navigate(['cMain/shopCar']);
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
          this.totalPrice += item.price * item.num;
          this.num += item.num;
          this.idList.push(item.id);
        });
        console.log(this.data);
        console.log(this.totalPrice);
        this.appService.postAliData(this.appProperties.shopStoreOrderAddUrl, {
          product: this.idList.join(','),
          location: this.name,
          distributionModel: 1,
          coupon: 1,
          payType: 1
        }, this.token).subscribe(
          data2 => {
            console.log(data2);
            alert(data2.message);
            if (data.status === 0) {
              this.router.navigate(['cMain/shopCar']);
            } else {
              this.orderId = data2.returnObject;
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
}
