import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './prepaidPay.component.html',
  styleUrls: ['./prepaidPay.component.css']
})
export class PrepaidPayComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public prepaidMoney;
  public isPost;
  public orderId;
  public isMessage;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    // this.id = urlParse(window.location.href)['id'];
    this.token = getToken();
    // this.getDate();
    this.isPost = false;
    this.prepaidMoney = undefined;
    this.isMessage = false;
    // document.getElementById('input_money').focus();
  }

  // getDate() {
  //   this.appService.postAliData(this.appProperties.shopVipCarListUrl, {}, this.token).subscribe(
  //     data => {
  //       console.log(123);
  //       if (data.status === 1) {
  //         this.vipCarList = data.returnObject;
  //         console.log(this.vipCarList);
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  goTo(flag) {
    if (flag === 'prepaid') {
      this.router.navigate(['cMain/prepaid']);
    } else if (flag === 'money') {
      this.router.navigate(['cMain/userCenter']);
    }

  }
  
  prepaidPay() {
    if (this.prepaidMoney <= 0.00 || this.prepaidMoney === undefined || this.prepaidMoney === null || this.prepaidMoney === '') {
      this.prepaidMoney = undefined;
      document.getElementById('input_money').focus();
      this.isMessage = true;
      return;
    } else {
      this.isMessage = false;
    }
    this.appService.postAliData(this.appProperties.shopPrepaidAddUrl, {
      price: this.prepaidMoney
    }, this.token).subscribe(
      data2 => {
        console.log(data2);
        alert(data2.message);
        if (data2.returnObject.orderState !== 10001) {
          this.orderId = data2.returnObject.id;
          this.appService.getAliData(this.appProperties.shopPrepaidBuyUrl, {
            orderId: this.orderId,
            url: 'http://webapp.youshuidaojia.com/cMain/prepaidPay'
          }, this.token).subscribe(
            data4 => {
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
          alert('支付完成！');
          this.router.navigate(['cMain/userCenter']);
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
            window.location.href = 'http://webapp.youshuidaojia.com/cMain/firstPage';
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

  moneyChange(event: any) {
    console.log(event <= 0.00);
    if(event <= 0.00) {
      this.isPost = true;
    } else {
      this.isPost = false;
    }
  }
}
