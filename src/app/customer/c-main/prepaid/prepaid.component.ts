import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './prepaid.component.html',
  styleUrls: ['./prepaid.component.css']
})
export class PrepaidComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public userIntegral;
  public prepaidMoney;
  public orderId;
  public errorNum;
  public errorSumit;
  public endMoney;
  public endPhone;
  public prepaidPhone;
  public judgeFriend;
  public judgeButton;
  public isbl;
  //
  public isFocusA;
  public isFocusB;
  public isFocusD;
  public isFocusE;
  public correct;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.isbl = true;
    if (getToken() !== null && getToken() !== undefined && getToken() !== '') {
      this.token = getToken();
    } else if (urlParse(window.location.href)['token'] !== null && urlParse(window.location.href)['token'] !== undefined
      && urlParse(window.location.href)['token'] !== '') {
      this.token = urlParse(window.location.href)['token'];
    }
    if (this.token === undefined || this.token === null || this.token === '') {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
        'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/prepaid?vm=1-7';
    } else {
      this.judgeUser();
    }
  }
  /**
   * 2019-05-27
   * @author maiziyao
   * 判断是否为保利用户
   */
  judgeUser() {
    this.appService.postAliData(this.appProperties.shopUserMoneyUrl, {}, this.token).subscribe(
      data => {
        if (data.status === -66) {
          alert(data.message);
          this.errorSumit = true;
          this.isbl = true;
          return;
        } else {
          this.isbl = false;
          this.getDate();
          this.prepaidMoney = undefined;
          this.judgeFriend = false;
          this.judgeButton = '点击帮好友充值';
          this.focusMoney('isFocusA');
          this.correct = false;
          this.endMoney = 500;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 获取用户余额积分信息
   */
  getDate() {
    this.appService.postAliData(this.appProperties.shopUserMoneyUrl, {}, this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.userBalance = data.returnObject.userBalance;
          this.userIntegral = data.returnObject.integral;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 用户点击输入其他金额
   */
  keyupMoney() {
    if (this.prepaidMoney !== undefined && this.prepaidMoney !== null && this.prepaidMoney !== '') {
      this.errorNum = false;
      this.errorSumit = false;
    } else {
      this.errorNum = true;
      this.errorSumit = true;
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 用户点击500、200、100、50金额按钮
   */
  focusMoney(val) {
    if (val === 'isFocusA') {
      this.isFocusA = true;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusB') {
      this.isFocusA = false;
      this.isFocusB = true;
      this.isFocusD = false;
      this.isFocusE = false;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusD') {
      this.isFocusA = false;
      this.isFocusB = false;
      this.isFocusD = true;
      this.isFocusE = false;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusE') {
      this.isFocusA = false;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = true;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusC') {
      this.isFocusA = false;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
      this.errorSumit = true;
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 跳转页面
   */
  goTo(flag) {
    if (flag === 'userCenter') {
      this.router.navigate(['cMain/userCenter']);
    } else if (flag === 'protocol') {
      window.location.href = 'http://webapp.youshuidaojia.com:8080/cMain/protocol?token=' + this.token;
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 选择本账号充值或者帮好友充值
   */
  prepaidFriend() {
    this.judgeFriend = !this.judgeFriend;
    if (this.judgeFriend === true) {
      this.judgeButton = '点击本账号充值';
      this.prepaidPhone = undefined;
      this.prepaidMoney = undefined;
      this.isFocusA = true;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
    } else if (this.judgeFriend === false) {
      this.judgeButton = '点击帮好友充值';
      this.correct = false;
      this.prepaidMoney = undefined;
      this.isFocusA = true;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 充值提交，验证手机号是否为优水用户
   */
  prepaidComfirm() {
    let user;
    if (this.judgeFriend === false) {
      this.endPhone = null;
      user = '本账号';
    } else {
      this.endPhone = this.prepaidPhone;
      const myreg = /^1[23456789]\d{9}$/;
      if (!myreg.test(this.endPhone)) {
        this.correct = true;
        return;
      } else {
        this.correct = false;
      }
      user = '好友';
    }
    if (this.isFocusA === false && this.isFocusB === false && this.isFocusD === false && this.isFocusE === false) {
      this.endMoney = this.prepaidMoney;
      if (Number(this.prepaidMoney) < 0) {
        this.errorNum = true;
        return;
      } else {
        this.errorNum = false;
      }
    }
    if (this.isFocusA === true && this.isFocusB === false && this.isFocusD === false && this.isFocusE === false) {
      this.endMoney = 500;
    } else if (this.isFocusA === false && this.isFocusB === true && this.isFocusD === false && this.isFocusE === false) {
      this.endMoney = 200;
    } else if (this.isFocusA === false && this.isFocusB === false && this.isFocusD === true && this.isFocusE === false) {
      this.endMoney = 100;
    } else if (this.isFocusA === false && this.isFocusB === false && this.isFocusD === false && this.isFocusE === true) {
      this.endMoney = 50;
    } else {
      this.endMoney = this.prepaidMoney;
      if (Number(this.prepaidMoney) < 0) {
        this.errorNum = true;
        return;
      } else {
        this.errorNum = false;
      }
    }
    this.modalService.info({
      nzContent: '<b>您确定为' + user + '充值吗?</b>',
      nzCancelText: '忍痛放弃',
      nzOkText: '确定支付',
      nzOnOk: () => this.prepaidPay()
    });
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 二次确认充值，支付
   */
  prepaidPay() {
    if (this.endMoney !== undefined && this.endMoney !== null && this.endMoney !== '') {
      this.appService.postAliData(this.appProperties.shopPrepaidAddUrl, {
        price: this.endMoney,
        friendPhone: this.endPhone
      }, this.token).subscribe(
        data2 => {
          alert(data2.message);
          if (data2.status === -99) {
            return;
          }
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
    } else {
      alert('充值金额不能为空！');
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * wechat支付
   */
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
  /**
   * 2019-02-15
   * @author maiziyao
   * 调用微信支付接口
   */
  onBridgeReady(data) {
    this.test(data);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 调用微信支付接口测试
   */
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
            console.log('支付成功');
          } else {
            alert('支付失败');
          }
        },
        cancel: (res) => {
          this.modalService.info({
            nzContent: '<b>您取消了支付</b>',
            nzCancelText: '忍痛放弃',
            nzOkText: '继续支付',
            nzOnOk: () => this.prepaidPay()
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
