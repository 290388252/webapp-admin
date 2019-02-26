import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {isCombinedNodeFlagSet} from 'tslint';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './grouponPay.component.html',
  styleUrls: ['./grouponPay.component.css']
})
export class GrouponPayComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  // get
  public consignee;
  public iphone;
  public address;
  public quantity;
  public totalMoney;
  public money;
  public goodsId;
  public goodsName;
  public grouponId;
  public locationId;
  public pic;
  public inConsignee;
  public inIphone;
  public inAddress;
  public noneAddress;
  public needAddress;
  public select;
  public addressList;
  public showAddress;
  //
  public orderId;
  public token;
  public isVisible;
  public isVisibleA;
  public isShow;
  public newAddress;
  public spellgroupId;
  public invite;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.quantity = urlParse(window.location.href)['quantity'];
    this.goodsId = urlParse(window.location.href)['id'];
    this.grouponId = urlParse(window.location.href)['groupId'];
    this.select = urlParse(window.location.href)['select'];
    this.spellgroupId = urlParse(window.location.href)['spellgroupId'];
    this.invite = urlParse(window.location.href)['invite'];
    // this.getTime();
    if (getToken() !== null && getToken() !== undefined && getToken() !== '') {
      this.token = getToken();
    } else if (urlParse(window.location.href)['token'] !== null && urlParse(window.location.href)['token'] !== undefined
      && urlParse(window.location.href)['token'] !== '') {
      this.token = urlParse(window.location.href)['token'];
    } else {
      this.token = urlParse(window.location.href)['token'];
    }
    this.consignee = undefined;
    this.iphone = undefined;
    this.address = undefined;
    this.isVisible = false;
    this.isShow = false;
    this.getLocation();
    this.appService.postAliData(this.appProperties.shoppingGoodsDetailUrl, {
      'id': this.goodsId,
      'spellgroupId': this.spellgroupId
    }, '').subscribe(
      data => {
        this.money = data.returnObject['groupPurchasePrice'];
        this.pic = data.returnObject['pic'].split(',')[0];
        this.goodsName = data.returnObject['name'];
        this.totalMoney = this.quantity * this.money;
      },
      error => {
        console.log(error);
      }
    );
    this.showAddress = false;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 需要配送的商品获取用户默认配送地址，不需要配送的获取商品自提机器的地址
   */
  getLocation() {
    this.appService.postAliData(this.appProperties.grouponJudgeAddressUrl, {
      'ids': this.goodsId,
      'spellgroupId': this.spellgroupId
    }, this.token).subscribe(
      data1 => {
        if (data1.status === 0) {
          this.needAddress = true;
          if (this.select === '1') {
            this.locationId = urlParse(window.location.href)['locationId'];
            this.appService.postAliData(this.appProperties.shopAddressCheckUrl + '?id=' + this.locationId, {}, this.token).subscribe(
              data2 => {
                if (data2.status === 1) {
                  this.noneAddress = false;
                  // 收货人
                  this.address = data2.returnObject.receiver;
                  // 地址
                  this.consignee = data2.returnObject.name;
                  this.iphone = data2.returnObject.phone;
                }
              },
              error => {
                console.log(error);
              }
            );
          } else {
            this.appService.postAliData(this.appProperties.shopAddressSelectUrl, '', this.token).subscribe(
              data => {
                if (data.status === 0) {
                  this.noneAddress = true;
                } else {
                  this.noneAddress = false;
                  this.address = data.returnObject[0]['name'];
                  this.consignee = data.returnObject[0]['receiver'];
                  this.iphone = data.returnObject[0]['phone'];
                  this.locationId = data.returnObject[0]['id'];
                }
              },
              error => {
                console.log(error);
              }
            );
          }
        } else if (data1.status === 1) {
          this.needAddress = false;
          this.addressList = data1.returnObject;
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
   * 展开查看或者关闭商品自提机器的地址
   */
  showAdd() {
    this.showAddress = !this.showAddress;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 修改或新增默认收货地址
   */
  toAddress(val) {
    if (val === '1') {
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 1,
          type: 3,
          quantity: this.quantity,
          goodsId: this.goodsId,
          grouponId: this.grouponId
        }
      });
    } else {
      this.router.navigate(['cMain/newAddress'], {
        queryParams: {
          type: 3,
          select: 1,
          quantity: this.quantity,
          goodsId: this.goodsId,
          grouponId: this.grouponId
        }
      });
    }

  }

  // showModal(): void {
  //   this.isVisible = true;
  //   this.newAddress = true;
  //   this.inConsignee = undefined;
  //   this.inIphone = undefined;
  //   this.inAddress = undefined;
  // }
  //
  // handleOk(): void {
  //   if (this.inConsignee === undefined || this.inConsignee === null || this.inConsignee === ''
  //     || this.inIphone === undefined || this.inIphone === null || this.inIphone === ''
  //     || this.inAddress === undefined || this.inAddress === null || this.inAddress === '') {
  //     this.isShow = true;
  //     return;
  //   }
  //   this.appService.postAliData(this.appProperties.shopAddressAddUrl, {
  //     receiver: this.inConsignee,
  //     name: this.inAddress,
  //     phone: this.inIphone
  //   }, this.token).subscribe(
  //     data => {
  //       if (data.status === 1) {
  //         this.isShow = false;
  //         this.isVisible = false;
  //         this.getLocation();
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  //
  // }
  //
  // handleCancel(): void {
  //   this.isVisible = false;
  // }
  //
  // alterAdress() {
  //   this.isVisible = true;
  //   this.newAddress = false;
  //   this.inConsignee = this.consignee;
  //   this.inIphone = this.iphone;
  //   this.inAddress = this.address;
  // }
  //
  // // handleCancelA(): void {
  // //   this.isVisible = false;
  // // }
  // handleAlter(): void {
  //   if (this.inConsignee === undefined || this.inConsignee === null || this.inConsignee === ''
  //     || this.inIphone === undefined || this.inIphone === null || this.inIphone === ''
  //     || this.inAddress === undefined || this.inAddress === null || this.inAddress === '') {
  //     this.isShow = true;
  //     return;
  //   }
  //   this.appService.postAliData(this.appProperties.shopAddressUpdateUrl, {
  //     receiver: this.inConsignee,
  //     name: this.inAddress,
  //     phone: this.inIphone,
  //     id: this.locationId
  //   }, this.token).subscribe(
  //     data => {
  //       if (data.status === 1) {
  //         this.isShow = false;
  //         this.isVisible = false;
  //         this.getLocation();
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  //
  // }
  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进入商品详情页面
   */
  goTo(id, name, pic) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        pic: pic,
        // isConglomerateCommodity: isConglomerateCommodity,
        type: 1
      }
    });
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 拼团订单提交支付，验证是否填写地址、是否需要填写地址
   */
  grouponBuy() {
    if (this.noneAddress === true) {
      alert('请填写收货地址!');
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 1,
          shopCar: 2,
          quantity: this.quantity,
          goodsId: this.goodsId,
          grouponId: this.grouponId
        }
      });
      return;
    }
    let addressType;
    if (this.needAddress === true) {
      addressType = 2;
    } else {
      addressType = 1;
    }
    this.appService.postAliData(this.appProperties.grouponAddUrl, {
      product: this.goodsId,
      itemName: this.goodsName,
      quantity: this.quantity,
      price: this.money,
      customerGroupId: this.grouponId,
      distributionModel: addressType,
      payType: 1,
      addressId: this.locationId,
      spellGroupId: this.spellgroupId
    }, this.token).subscribe(
      data2 => {
        if (data2.status === 2) {
          alert(data2.message);
          return;
        } else if (data2.status !== 0) {
          alert(data2.message);
          if (data2.returnObject.orderState !== 10001) {
            this.orderId = data2.returnObject.orderId;
            this.appService.getAliData(this.appProperties.grouponBuyUrl, {
              orderId: this.orderId,
              url: 'http://webapp.youshuidaojia.com/cMain/grouponPay'
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
            this.router.navigate(['cMain/firstPage']);
          }
        } else {
          alert(data2.message);
          return;
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
   * wechat支付接口
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
            if (this.invite === 1 || this.invite === '1') {
              window.location.href = 'http://webapp.youshuidaojia.com/cMain/grouponInPayFinish?token=' + this.token + '&orderId=' + this.orderId;
            } else {
              window.location.href = 'http://webapp.youshuidaojia.com/cMain/grouponPayFinish?token=' + this.token + '&orderId=' + this.orderId;
            }
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
            nzOnOk: () => this.grouponBuy()
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
