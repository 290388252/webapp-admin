import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  public list;
  public noPayList;
  public payList;

  public listTwo;
  public noPayListTwo;
  public payListTwo;
  public imgUrl = this.appProperties.shopImgUrl;
  public all: boolean;
  public noOrder: boolean;
  public order: boolean;
  constructor(private appService: AppService, private appProperties: AppProperties) { }

  ngOnInit() {
    this.orderList(0);
    this.all = false;
    this.noOrder = true;
    this.order = true;
  }
  sort(flag) {
    if (flag === 1) {
      this.all = false;
      this.noOrder = true;
      this.order = true;
      this.orderList(0);
    } else if (flag === 2) {
      this.all = true;
      this.noOrder = false;
      this.order = true;
      this.orderList(1);
    } else if (flag === 3) {
      this.all = true;
      this.noOrder = true;
      this.order = false;
      this.orderList(2);
    }
  }
  orderList(type) {
    this.appService.postAliData(this.appProperties.shopStoreOrderFindUrl, {findType: type} , getToken()).subscribe(
      data => {
        console.log(data);
        if (type === 0) {
          this.list = data.returnObject['storeOrder'];
          this.listTwo = data.returnObject['machinesOrder'];
        } else if (type === 1) {
          this.noPayList = data.returnObject['storeOrder'];
          this.noPayListTwo = data.returnObject['machinesOrder'];
        } else if (type === 2) {
          this.payList = data.returnObject['storeOrder'];
          this.payListTwo = data.returnObject['machinesOrder'];
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  toText(state) {
    let text;
    if (state === 10001) {
      text = '已支付';
    } else if (state === 10002) {
      text = '未支付';
    }
    return text;
  }
  pay(item) {
    console.log(item);
    this.appService.postAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
      orderId: item.id,
      url: 'http://webapp.youshuidaojia.com/cMain/myOrder'
    }, getToken()).subscribe(
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
  payM(item) {
    console.log(item);
    this.appService.postAliData(this.appProperties.orderUnifiedOrderUrl, {
      orderId: item.orderId,
      url: 'http://webapp.youshuidaojia.com/cMain/myOrder'
    }, getToken()).subscribe(
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
}
