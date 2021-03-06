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
  public orderType;
  public allList;
  public prepaidList;
  public unPayList;
  public imgUrl = this.appProperties.shopImgUrl;
  public vmImgUrl = this.appProperties.filesImgUrl;
  public all: boolean;
  public noOrder: boolean;
  public order: boolean;
  public mcOpenId;
  public mcId;
  public mcToken;
  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {
  }

  ngOnInit() {
    this.orderType = '1';
    this.orderList(0);
    this.all = false;
    this.noOrder = true;
    this.order = true;
    this.mcOpenId = urlParse(window.location.search)['mcOpenId'];
    this.mcId = urlParse(window.location.search)['mcId'];
  }
  /**
   * 2019-05-23
   * @author maiziyao
   * 获取机器token
   */
  getMachineToken() {

  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 根据选择订单状态获取对应状态的订单list
   */
  sort(flag) {
    if (flag === 0) {
      this.all = false;
      this.noOrder = true;
      this.order = true;
      this.orderList(0);
    } else if (flag === 1) {
      this.all = true;
      this.noOrder = false;
      this.order = true;
      this.orderList(1);
    } else if (flag === 2) {
      this.all = true;
      this.noOrder = true;
      this.order = false;
      this.orderList(2);
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 选择查看商城订单或者机器订单
   */
  changeRadio() {
    let type;
    if (this.all === false) {
      type = 0;
    } else if (this.noOrder === false) {
      type = 1;
    } else if (this.order === false) {
      type = 2;
    }
    this.orderList(type);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 根据选择查看商城订单或者机器订单获取对应的订单list
   */
  orderList(type) {
    this.appService.postAliData(this.appProperties.shopStoreOrderFindUrl, {findType: type, orderType: this.orderType},
      getToken()).subscribe(
      data => {
        if (type === 0) {
          this.allList = data.returnObject;
        } else if (type === 1) {
          this.prepaidList = data.returnObject;
        } else if (type === 2) {
          this.unPayList = data.returnObject;
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 申请退款
   */
  applyRefund(item) {
    this.appService.postFormData(this.appProperties.IfApplayRefundUrl, {
        payCode: item.payCode,
      },
      getToken()).subscribe(
      data => {
        if (data.status === 0) {
          let type;
          if (this.orderType === '1') {
            type = 2;
          } else if (this.orderType === '2') {
            type = 1;
          }
          this.router.navigate(['cMain/applyRefund'], {
            queryParams: {
              nowPrice: item.nowprice,
              payCode: item.payCode,
              orderType: type,
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 支付未完成的订单
   */
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
      this.appService.postFormData(this.appProperties.getMachineTokenUrl, {openId: this.mcOpenId, id: this.mcId}, getToken()).subscribe(
        data => {
          if (data.status === 1) {
            this.mcToken = data.returnObject;
            this.appService.getDataOpen(this.appProperties.orderUnifiedOrderUrl, {
              orderId: item.orderId,
              url: 'http://webapp.youshuidaojia.com:8080/cMain/myOrder'
            }, this.mcToken).subscribe(
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
        },
        error => {
          console.log(error);
        }
      );

    } else if (item.type === 3) {
      // 团购
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
            window.location.href = 'http://webapp.youshuidaojia.com:8080/cMain/myOrder';
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
