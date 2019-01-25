import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {isCombinedNodeFlagSet} from 'tslint';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './grouponDetails.component.html',
  styleUrls: ['./grouponDetails.component.css']
})
export class GrouponDetailsComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  // get
  //
  public addressList;
  public headerList;
  public headerLength;
  public carryWaterList = {};
  public shoppingBeanList = {};
  public carryWaterName;
  public carryWaterRemark;
  //
  public showAddress;
  public orderId;
  public maxTimer;
  public token;
  public isVisibleCouponOne = false;
  public isVisibleCouponTwo = false;
  public isVisibleCouponFour = false;
  // share
  public shareId;
  public shareName;
  public sharePic;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnDestroy() {
    // if (this.timerList.length !== 0) {
    //   this.timerList.forEach(timer => {
    //     clearInterval(timer);
    //     console.log('取消计时器');
    //   });
    // }
  }

  ngOnInit() {
    this.orderId = urlParse(window.location.href)['orderId'];
    // this.getTime();
    this.token = getToken();
    this.getData(this.orderId);
    this.isVisibleCouponOne = false;
    this.showAddress = false;
    this.share();
  }

  getData(orderId) {
    this.appService.postFormData(this.appProperties.grouponOrderDetailsUrl, {'orderId': orderId}, this.token).subscribe(
      data => {
        this.addressList = data.addressList;
        this.carryWaterList = data.carryCustomer;
        this.shoppingBeanList = data.shoppingBean;
        this.shareId = data.shoppingBean.customerGroupId;
        this.shareName = this.shoppingBeanList['itemName'];
        this.sharePic = this.shoppingBeanList['pic'];
        const headerList = data.shoppingBean.customerSpellGroupList;
        this.headerLength = this.shoppingBeanList['minimumGroupSize'] - headerList.length;
        let headerEndList = [];
        headerList.forEach(item => {
          if (item['isSpellTheMain'] === 1) {
            headerEndList.push({
              customerId: item.customerId,
              isSpellTheMain: item.isSpellTheMain,
              headimgurl: item.headimgurl,
              nickname: item.nickname
            });
          }
        });
        headerList.forEach(item => {
          if (item['isSpellTheMain'] === 0) {
            headerEndList.push({
              customerId: item.customerId,
              isSpellTheMain: item.isSpellTheMain,
              headimgurl: item.headimgurl,
              nickname: item.nickname
            });
          }
        });
        if (headerEndList.length > 4) {
          this.headerList = [];
          for (let i = 0; i < 4; i++) {
            this.headerList.push(headerEndList[i]);
          }
        } else {
          this.headerList = headerEndList;
        }
        // this.maxTimer = data.returnObject.time;
        // const maxTimer = (new Date(this.maxTimer.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
        // this.countDown(maxTimer, function (msg) {
        //   document.getElementById('timer').innerHTML = msg;
        // });
      },
      error => {
        console.log(error);
      }
    );
  }

  showAdd() {
    this.showAddress = !this.showAddress;
  }

  showExplain() {
    this.isVisibleCouponFour = false;
  }

  countDown(maxtime, fn) {
    const timer = setInterval(function () {
      if (maxtime >= 0) {
        const hours = Math.floor(maxtime / (60 * 60));
        const minutes = Math.floor(maxtime / 60) - (hours * 60);
        const seconds = Math.floor(maxtime % 60);
        let endHour;
        let endMinutes;
        let endSeconds;
        if (hours <= 9) {
          endHour = '0' + hours;
        } else {
          endHour = hours;
        }
        if (minutes <= 9) {
          endMinutes = '0' + minutes;
        } else {
          endMinutes = minutes;
        }
        if (seconds <= 9) {
          endSeconds = '0' + seconds;
        } else {
          endSeconds = seconds;
        }
        const msg = '剩余:' + endHour + ':' + endMinutes + ':' + endSeconds;
        fn(msg);
        --maxtime;
      } else {
        clearInterval(timer);
        fn('已结束!');
      }
    }, 1000);
  }

  goTo(val) {
    if (val === 0) {
      this.router.navigate(['cMain/grouponRefund']);
    }
  }

  orderOff() {
    this.isVisibleCouponTwo = true;
    document.getElementsByClassName('ant-modal-close-x')[0]['style'].cssText = 'display: none;';
    document.getElementsByClassName('ant-modal-footer')[0]['style'].cssText = 'text-align: center;';
  }

  submitOrder() {
    this.appService.postAliData(this.appProperties.bargainCancelUrl + this.orderId, '', this.token).subscribe(
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
    this.isVisibleCouponTwo = false;
  }

  invite() {
    this.isVisibleCouponOne = true;
    document.getElementsByClassName('ant-modal-body')[0]['style'].cssText = 'padding: 0;';
  }

  closeCoupon() {
    this.isVisibleCouponOne = false;
  }

  showFour(carryName, remark) {
    this.isVisibleCouponFour = true;
    this.carryWaterName = carryName;
    this.carryWaterRemark = remark;
  }

  refund() {
    this.router.navigate(['cMain/grouponRefund'], {
      queryParams: {
        orderId: this.orderId
      }
    });
  }

  share() {
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
          const shareData = {
            title: '仅剩' + this.headerLength + '个名额了',
            desc: '优水到家:' + this.shareName,
            // 这里请特别注意是要去除html
            link: 'http://webapp.youshuidaojia.com/cMain/grouponShare?customerSpellGroupId=' + this.shareId,
            imgUrl: this.imgUrl + this.sharePic,
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

  // 判断是微信登陆还是支付宝登陆
  urlParse(url): object {
    const obj = {};
    const reg = /[?&][^?&]+=[^?&]+/g;
    const arr = url.match(reg);
    if (arr) {
      arr.forEach(function (item) {
        const tempArr = item.substring(1).split('=');
        const key = decodeURIComponent(tempArr[0]);
        const val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      });
    }
    return obj;
  }


  // turnData(date) {
  //   const nowDate = new Date(date);
  //   const nowY = nowDate.getFullYear();
  //   const nowM = nowDate.getMonth() + 1;
  //   const nowD = nowDate.getDate();
  //   const endTime = nowY + '' + (nowM < 10 ? '0' + nowM : nowM) + '' + (nowD < 10 ? '0' + nowD : nowD);
  //   return endTime;
  // }
  pay() {
    this.appService.getAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
      orderId: this.orderId,
      url: 'http://webapp.youshuidaojia.com/cMain/grouponDetails'
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
            window.location.href = 'http://webapp.youshuidaojia.com/cMain/grouponDetails';
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
