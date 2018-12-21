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
  //
  public orderId;
  public token;
  public isVisible;
  public isVisibleA;
  public isShow;
  public newAddress;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.quantity = urlParse(window.location.href)['quantity'];
    this.goodsId = urlParse(window.location.href)['id'];
    this.grouponId = urlParse(window.location.href)['groupId'];
    this.select = urlParse(window.location.href)['select'];
    // this.vipTypeId = urlParse(window.location.href)['vipTypeId'];
    // this.vipValidity = urlParse(window.location.href)['vipValidity'];
    // this.getTime();
    this.token = getToken();
    this.consignee = undefined;
    this.iphone = undefined;
    this.address = undefined;
    this.isVisible = false;
    this.isShow = false;
    this.getLocation();
    this.appService.postAliData(this.appProperties.shoppingGoodsDetailUrl, {id: this.goodsId}, '').subscribe(
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
  }

  getLocation() {
    this.appService.postAliData(this.appProperties.grouponJudgeAddressUrl, {'ids': this.goodsId}, this.token).subscribe(
      data1 => {
        console.log('data1');
        console.log(data1);
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
                console.log('data');
                console.log(data);
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
        } else {
          this.noneAddress = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

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

  showModal(): void {
    this.isVisible = true;
    this.newAddress = true;
    this.inConsignee = undefined;
    this.inIphone = undefined;
    this.inAddress = undefined;
  }

  handleOk(): void {
    if (this.inConsignee === undefined || this.inConsignee === null || this.inConsignee === ''
      || this.inIphone === undefined || this.inIphone === null || this.inIphone === ''
      || this.inAddress === undefined || this.inAddress === null || this.inAddress === '') {
      this.isShow = true;
      return;
    }
    this.appService.postAliData(this.appProperties.shopAddressAddUrl, {
      receiver: this.inConsignee,
      name: this.inAddress,
      phone: this.inIphone
    }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.isShow = false;
          this.isVisible = false;
          this.getLocation();
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  handleCancel(): void {
    this.isVisible = false;
  }

  alterAdress() {
    this.isVisible = true;
    this.newAddress = false;
    this.inConsignee = this.consignee;
    this.inIphone = this.iphone;
    this.inAddress = this.address;
  }

  // handleCancelA(): void {
  //   this.isVisible = false;
  // }
  handleAlter(): void {
    if (this.inConsignee === undefined || this.inConsignee === null || this.inConsignee === ''
      || this.inIphone === undefined || this.inIphone === null || this.inIphone === ''
      || this.inAddress === undefined || this.inAddress === null || this.inAddress === '') {
      this.isShow = true;
      return;
    }
    this.appService.postAliData(this.appProperties.shopAddressUpdateUrl, {
      receiver: this.inConsignee,
      name: this.inAddress,
      phone: this.inIphone,
      id: this.locationId
    }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.isShow = false;
          this.isVisible = false;
          this.getLocation();
        }
      },
      error => {
        console.log(error);
      }
    );

  }

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
    this.appService.postAliData(this.appProperties.grouponAddUrl, {
      product: this.goodsId,
      itemName: this.goodsName,
      quantity: this.quantity,
      price: this.totalMoney,
      customerGroupId: this.grouponId,
      distributionModel: 2,
      payType: 1,
      addressId: this.locationId
    }, this.token).subscribe(
      data2 => {
        console.log(data2);
        if (data2.status === 2) {
          alert(data2.message);
          return;
        } else if (data2.status !== 0) {
          alert(data2.message);
          if (data2.returnObject.orderState !== 10001) {
            this.orderId = data2.returnObject.orderId;
            console.log(this.orderId);
            this.appService.getAliData(this.appProperties.grouponBuyUrl, {
              orderId: this.orderId,
              url: 'http://webapp.youshuidaojia.com/cMain/grouponPay'
            }, this.token).subscribe(
              data4 => {
                console.log(data4);
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
