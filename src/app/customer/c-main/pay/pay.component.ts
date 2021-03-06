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
  public payType: string;
  public reduceMoney = 0;
  public totalMoney = 0;
  public noneAddress;
  public showAddress;
  public select;
  public isDelivery;

  constructor(private appService: AppService, private appProperties: AppProperties,
              private router: Router, private routeInfo: ActivatedRoute, private modalService: NzModalService) {
  }

  // 个人中心增删查改 ！
  // 支付 新增 选择
  ngOnInit() {
    this.routeInfo.queryParams.subscribe(
      params => {
        this.ids = params.ids;
        this.payType = params.payType;
      }
    );
    this.select = urlParse(window.location.href)['select'];
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else {
      this.token = getToken();
    }
    /**
     * 2019-02-15
     * @author maiziyao
     * 获取用户默认地址
     */
    this.appService.postAliData(this.appProperties.shopAddressShow, {'ids': this.ids}, this.token).subscribe(
      data => {
        if (data.status === 0) {
          this.showAddress = true;
          if (this.select === '1') {
            this.locationId = urlParse(window.location.href)['locationId'];
            this.appService.postAliData(this.appProperties.shopAddressCheckUrl + '?id=' + this.locationId, {}, this.token).subscribe(
              data1 => {
                if (data1.status === 1) {
                  this.noneAddress = false;
                  // 收货人
                  this.name = data1.returnObject.receiver;
                  // 地址
                  this.receiver = data1.returnObject.name;
                  this.phone = data1.returnObject.phone;
                }
              },
              error => {
                console.log(error);
              }
            );
          } else {
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
          }
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 新增、编辑、删除地址
   */
  goTo(val) {
    if (val === '1') {
      // 新增地址
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          type: 2,
          isAdd: 1,
          ids: this.ids,
          payType: this.payType
        }
      });
    } else if (val === '2') {
      // 选择地址
      this.router.navigate(['cMain/newAddress'], {
        queryParams: {
          type: 2,
          select: 1,
          ids: this.ids,
          payType: this.payType
        }
      });
    }

  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 打开可用优惠券弹框
   */
  selectCoupon(): void {
    if (this.couponLength !== 0
    ) {
      this.isCoupon = true;
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 选择使用的优惠券
   */
  choiceCoupon(item) {
    this.reduceMoney = 0;
    this.couponId = item.id;
    this.reduceMoney = item.deductionMoney;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭选择优惠券弹框
   */
  CouponCancel(): void {
    this.isCoupon = false;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 提交选择的优惠券
   */
  CouponOk(): void {
    this.totalMoney = this.totalPrice - this.reduceMoney;
    this.isCoupon = false;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 提交订单，支付
   */
  button(flag) {
    if (flag === 1) {
      this.pay();
    } else if (flag === 2) {
      history.back();
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 二次确定取消支付弹框
   */
  showConfirm(): void {
    this.modalService.info({
      nzContent: '<b>您取消了支付</b>',
      nzCancelText: '忍痛放弃',
      nzOkText: '继续支付',
      nzOnOk: () => this.pay()
    });
  }

  /**
   * 2019-12-20
   * @author maiziyao
   * 选择配送方式
   */
  delivery(val) {
    console.log(val === '1');
    if (val === '1') {
      this.isDelivery = false;
    } else {
      this.isDelivery = true;
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 支付
   */
  pay() {
    this.appService.postAliData(this.appProperties.shopStoreOrderAddUrl, {
      product: this.shopCartId.join(','),
      addressId: this.locationId,
      distributionModel: this.radioValue,
      coupon: this.couponId,
      payType: 1,
    }, this.token).subscribe(
      data2 => {
        if (data2.status === 0) {
          alert(data2.message);
          // 新增地址
          this.router.navigate(['cMain/addAddress'], {
            queryParams: {
              type: 2,
              isAdd: 1,
              ids: this.ids,
              payType: this.payType
            }
          });
          return;
        } else if (data2.status === 2) {
          alert(data2.message);
          return;
        } else if (data2.returnObject.orderState !== 10001) {
          this.orderId = data2.returnObject.orderId;
          this.appService.getAliData(this.appProperties.shopUnifiedStoreOrderUrl, {
            orderId: this.orderId,
            url: 'http://webapp.youshuidaojia.com/cMain/pay'
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
          this.token = getToken();
          window.location.href = 'http://webapp.youshuidaojia.com:8080/cMain/payFinish?' + 'token=' + this.token;
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
            // window.location.href = 'http://webapp.youshuidaojia.com/cMain/userCenter';
            // this.router.navigate(['cMain/shopCar']);
            this.token = getToken();
            // this.router.navigate(['cMain/payFinish']);
            window.location.href = 'http://webapp.youshuidaojia.com:8080/cMain/payFinish?' + 'token=' + this.token;
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取购物车商品list、商品数量及价格
   */
  showShopCarPrice() {
    this.appService.postAliData(this.appProperties.shoppingCarUrl, {
      ids: this.ids,
      type: this.payType
    }, this.token).subscribe(
      data => {
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 转换价格
   */
  toFixed(num) {
    return Math.round(num * 100) / 100;
  }
}
