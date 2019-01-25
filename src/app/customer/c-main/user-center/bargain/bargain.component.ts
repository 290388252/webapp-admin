import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './bargain.component.html',
  styleUrls: ['./bargain.component.css']
})
export class BargainComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public orderId;
  //
  public initList;
  public addressName;
  public receiverName;
  public receiverPhone;
  public itemName;
  public nowPrice;
  public num;
  public price;
  public payCode;
  public startTime;
  public createTime;
  public stateName;
  public disable;
  public isFocusA;
  public isFocusB;
  public isVisibleCouponOne = false;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    // this.userBalance = urlParse(window.location.href)['userBalance'];
    this.token = urlParse(window.location.href)['token'];
    this.orderId = urlParse(window.location.href)['orderId'];
    if (this.orderId !== undefined) {
      this.getInit();
    }
    this.disable = false;
  }

  getInit() {
    this.appService.postAliData(this.appProperties.bargainDetailsUrl + this.orderId, '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.initList = data.returnObject.list;
          this.itemName = data.returnObject.itemName;
          this.nowPrice = data.returnObject.nowPrice;
          this.num = data.returnObject.num;
          this.price = data.returnObject.price;
          this.payCode = data.returnObject.payCode;
          this.addressName = data.returnObject.addressName;
          this.receiverName = data.returnObject.receiverName;
          this.receiverPhone = data.returnObject.receiverPhone;
          this.createTime = this.turnTime(data.returnObject.orderCreateTime);
          this.startTime = this.turnTime(data.returnObject.bargainStartTime);
          this.stateName = data.returnObject.stateName;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  turnTime(date) {
    const nowDate = new Date(date);
    const nowY = nowDate.getFullYear();
    const nowM = nowDate.getMonth() + 1;
    const nowD = nowDate.getDate();
    const nowH = nowDate.getHours();
    const nowMM = nowDate.getMinutes();
    const nowS = nowDate.getSeconds();
    const endDate = nowY + '-' + (nowM < 10 ? '0' + nowM : nowM) + '-' + (nowD < 10 ? '0' + nowD : nowD);
    const endTime = (nowH < 10 ? '0' + nowH : nowH) + ':' + (nowMM < 10 ? '0' + nowMM : nowMM) + ':' + (nowS < 10 ? '0' + nowS : nowS);
    const end = endDate + ' ' + endTime;
    return end;
  }

  goTo() {
    this.router.navigate(['cMain/bargainList'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }

  cancal() {
    this.isVisibleCouponOne = false;
  }

  submit() {
    this.appService.postAliData(this.appProperties.bargainCancelUrl + this.orderId, '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          alert('取消订单成功!');
          this.router.navigate(['cMain/userCenter']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  toCancel() {
    this.isVisibleCouponOne = true;
    document.getElementsByClassName('ant-modal-close-x')[0]['style'].cssText = 'display: none;';
    document.getElementsByClassName('ant-modal-footer')[0]['style'].cssText = 'text-align: center;';
  }

  toTel() {
    window.location.href = 'tel://4008858203';
  }

  toPay() {
    this.disable = true;
    this.appService.getAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
      orderId: this.orderId,
      url: 'http://webapp.youshuidaojia.com/cMain/bargain'
    }, this.token).subscribe(
      data4 => {
        console.log(data4);
        if (data4.status === 2) {
          this.disable = false;
          window.location.href = data4.returnObject;
        } else {
          this.disable = false;
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
            this.router.navigate(['cMain/userCenter']);
            // window.location.href = 'http://webapp.youshuidaojia.com/cMain/payFinish?' + 'token=' + this.token;
          } else {
            alert('支付失败');
          }
        },
        cancel: (res) => {
          this.modalService.info({
            nzContent: '<b>您取消了支付</b>',
            nzCancelText: '忍痛放弃',
            nzOkText: '继续支付',
            nzOnOk: () => this.toPay()
          });
          // 支付取消
        },
        error: (res) => {
          alert('出错了，请联系优水到家管理员');
        }
      });
    });
  }
}
