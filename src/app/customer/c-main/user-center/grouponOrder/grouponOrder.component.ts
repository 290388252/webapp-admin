import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './grouponOrder.component.html',
  styleUrls: ['./grouponOrder.component.css']
})
export class GrouponOrderComponent implements OnInit {
  public allList;
  public obligationList;
  public shareList;
  public pickList;
  public completedList;
  public closedList;
  public all: boolean;
  public obligation: boolean;
  public share: boolean;
  public shareId;
  public shareNum;
  public shareName;
  public sharePic;
  public pick: boolean;
  public completed: boolean;
  public closed: boolean;
  public val;
  public cancelId;
  public isVisibleCouponOne;
  public isVisibleCouponTwo;

  public imgUrl = this.appProperties.shopImgUrl;
  public vmImgUrl = this.appProperties.filesImgUrl;
  public token;

  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    this.val = urlParse(window.location.search)['val'];
    if (this.val !== undefined) {
      this.sort(this.val);
    } else {
      this.orderList(0);
      this.all = true;
      this.obligation = false;
      this.share = false;
      this.pick = false;
      this.completed = false;
      this.closed = false;
    }
    this.isVisibleCouponOne = false;
    this.isVisibleCouponTwo = false;

  }

  shareFriend(shareName, shareNum, shareId, sharePic) {
    const that = this;
    this.appService.postFormData(this.appProperties.wechatShareInfoUrl,
      {url: window.location.href},
      this.token).subscribe(
      data => {
        wx.config({
          debug: false,
          appId: data.data.appId,
          timestamp: data.data.timestamp,
          nonceStr: data.data.nonceStr,
          signature: data.data.signature,
          jsApiList: ['checkJsApi',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
          ]
        });
        wx.ready(function () {
          // const shareNum = that.shareName;
          const shareData = {
            title: '仅剩' + shareNum + '个名额了',
            desc: '优水到家:' + shareName,
            // 这里请特别注意是要去除html
            link: 'http://webapp.youshuidaojia.com/cMain/grouponShare?customerSpellGroupId=' + shareId,
            imgUrl: that.imgUrl + sharePic,
            // imgUrl: '../../../assets/main/logo.png',
            success: function () {
              // 用户确认分享后执行的回调函数
              console.log('success');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              console.log('cancel');
            }
          };
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareQQ(shareData);
          wx.onMenuShareWeibo(shareData);
        });
        wx.error(function (res) {
          console.log(res);
        });
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  goTo(id) {
    this.router.navigate(['cMain/grouponDetails'], {
      queryParams: {
        orderId: id
      }
    });
  }

  refund(id) {
    this.router.navigate(['cMain/grouponRefund'], {
      queryParams: {
        orderId: id
      }
    });
  }

  sort(flag) {
    if (flag.toString() === '0') {
      // 全部
      this.all = true;
      this.obligation = false;
      this.share = false;
      this.pick = false;
      this.completed = false;
      this.closed = false;
      this.orderList(0);
    } else if (flag.toString() === '1') {
      console.log(flag);
      // 待付款
      this.all = false;
      this.obligation = true;
      this.share = false;
      this.pick = false;
      this.completed = false;
      this.closed = false;
      this.orderList(1);
    } else if (flag.toString() === '2') {
      // 待分享
      this.all = false;
      this.obligation = false;
      this.share = true;
      this.pick = false;
      this.completed = false;
      this.closed = false;
      this.orderList(2);
    } else if (flag.toString() === '3') {
      // 待取货
      this.all = false;
      this.obligation = false;
      this.share = false;
      this.pick = true;
      this.completed = false;
      this.closed = false;
      this.orderList(3);
    } else if (flag.toString() === '4') {
      // 已完成
      this.all = false;
      this.obligation = false;
      this.share = false;
      this.pick = false;
      this.completed = true;
      this.closed = false;
      this.orderList(4);
    } else if (flag.toString() === '5') {
      // 已关闭
      this.all = false;
      this.obligation = false;
      this.share = false;
      this.pick = false;
      this.completed = false;
      this.closed = true;
      this.orderList(5);
    }
  }

  orderList(type) {
    this.appService.postAliData(this.appProperties.grouponOrderUrl, {findType: type, 'orderType': 3},
      getToken()).subscribe(
      data => {
        if (type === 0) {
          this.allList = data.returnObject;
        } else if (type === 1) {
          this.obligationList = data.returnObject;
        } else if (type === 2) {
          this.shareList = data.returnObject;
        } else if (type === 3) {
          this.pickList = data.returnObject;
        } else if (type === 4) {
          this.completedList = data.returnObject;
        } else if (type === 5) {
          this.closedList = data.returnObject;
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  orderOff(orderId) {
    this.isVisibleCouponOne = true;
    this.cancelId = orderId;
    document.getElementsByClassName('ant-modal-close-x')[0]['style'].cssText = 'display: none;';
    document.getElementsByClassName('ant-modal-footer')[0]['style'].cssText = 'text-align: center;';
  }

  submitOrder() {
    this.appService.postAliData(this.appProperties.bargainCancelUrl + this.cancelId, '', this.token).subscribe(
      data => {
        if (data.status === 1) {
          alert('取消订单成功!');
          this.router.navigate(['cMain/grouponOrder']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  cancalOrder() {
    this.isVisibleCouponOne = false;
  }

  applyRefund(item) {
    this.appService.postFormData(this.appProperties.IfApplayRefundUrl, {
        payCode: item.payCode,
      },
      getToken()).subscribe(
      data => {
        if (data.status === 0) {
          this.router.navigate(['cMain/applyRefund'], {
            queryParams: {
              nowPrice: item.nowprice,
              payCode: item.payCode
            }
          });
        } else {
          alert(data.returnObject[0].stateName);
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  invite(item) {
    console.log(item);
    console.log(item['list']);
    this.shareId = item.customerGroupId;
    this.shareName = item['list'][0].itemName;
    this.sharePic = item.list[0].pic;
    this.shareNum = item.residueNum;
    this.isVisibleCouponTwo = true;
    console.log(this.shareId);
    console.log(this.shareNum);
    document.getElementsByClassName('ant-modal-body')[1]['style'].cssText = 'padding: 0;';
    this.shareFriend(this.shareName, this.shareNum, this.shareId, this.sharePic);
  }

  closeCoupon() {
    this.isVisibleCouponTwo = false;
  }

  pay(item) {
    // 商城
    if (item.type === 1) {
      this.appService.getAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
        orderId: item.id,
        url: 'http://webapp.youshuidaojia.com/cMain/myOrder'
      }, getToken()).subscribe(
        data4 => {
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
    } else if (item.type === 2) {
      // 机器
      this.appService.getAliData(this.appProperties.orderUnifiedOrderUrl, {
        orderId: item.id,
        url: 'http://webapp.youshuidaojia.com/cMain/myOrder'
      }, getToken()).subscribe(
        data4 => {
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
    } else if (item.type === 3) {
      // 团购
      this.appService.getAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
        orderId: item.id,
        url: 'http://webapp.youshuidaojia.com/cMain/grouponOrder'
      }, getToken()).subscribe(
        data4 => {
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
  }

  payM(item) {
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
            window.location.href = 'http://webapp.youshuidaojia.com/cMain/myOrder';
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
