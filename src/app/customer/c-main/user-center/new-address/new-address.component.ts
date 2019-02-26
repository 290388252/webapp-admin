import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {
  public emptyAddress = true;
  public isVisible = false;
  private token;
  public list = [];
  public delItem;
  public type;
  public ids;
  public select;
  public groupId;
  public pay;
  public quantity;
  public payList;
  public goodsId;
  public payType;
  public isVisibleCouponOne = false;
  public isVisibleCouponTwo = false;
  public isVisibleCouponThree = false;
  public showName;
  public showPhone;
  public showAddress;
  public addressId;
  public activityId;
  public bargainMoney;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.type = urlParse(window.location.href)['type'];
    // 支付
    this.ids = urlParse(window.location.href)['ids'];
    this.select = urlParse(window.location.href)['select'];
    this.payType = urlParse(window.location.href)['payType'];
    this.groupId = urlParse(window.location.href)['groupId'];
    this.goodsId = urlParse(window.location.href)['goodsId'];
    this.quantity = urlParse(window.location.href)['quantity'];
    this.activityId = urlParse(window.location.href)['activityId'];
    this.token = getToken();
    this.getInit();
    const test = 'http://localhost:4202/cMain/newAddress?type=1&id=2';
    this.getParamsWithUrl(test);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取地址list
   */
  getInit() {
    this.appService.postAliData(this.appProperties.shopAddressSelectUrl, '', this.token).subscribe(
      data => {
        data.returnObject === null ? this.emptyAddress = true : this.emptyAddress = false;
        if (!this.emptyAddress) {
          this.list = data.returnObject;
          if (this.type === '1') {
            let one;
            setTimeout(() => {
              one = document.getElementsByName('default');
              for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].defaultFlag === 1) {
                  one[i]['checked'] = true;
                  return;
                }
              }
            });
          }

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
   * 获取地址list
   */
  getParamsWithUrl(url) {
    const args = url.split('?');
    if (args[0] === url) {
      return '';
    }
    const arr = args[1].split('&');
    console.log('arr');
    console.log(arr);
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      let arg = arr[i].split('=');
      obj[arg[0]] = arg[1];
    }
    console.log(obj);
    return obj;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 设置或取消默认地址
   */
  setDefault(item) {
    // shopAddressUpdateUrl
    const one = document.getElementsByName('default');
    const two = document.getElementById(('a' + item.id));
    if (two['checked'] === false) {
      for (let j = 0; j < one.length; j++) {
        one[j]['checked'] = false;
      }
    } else {
      for (let j = 0; j < one.length; j++) {
        one[j]['checked'] = false;
      }
      two['checked'] = true;
    }
    this.appService.postAliData(this.appProperties.shopAddressUpdateUrl, {
      receiver: item.alterName,
      name: item.alterSite,
      phone: item.alterPhone,
      defaultFlag: two['checked'] === false ? '0' : '1',
      sex: item.alterSex,
      id: item.id
    }, this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.getInit();
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
   * 新增地址
   */
  addAddress() {
    if (this.type === '1') {
      // 个人中心
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 1,
          type: 1
        }
      });
    } else if (this.type === '2') {
      // 支付新增
      if (this.select === '1') {
        this.router.navigate(['cMain/addAddress'], {
          queryParams: {
            isAdd: 1,
            type: 2,
            // 选择新增
            select: 1,
            ids: this.ids,
            payType: this.payType
          }
        });
      }
    } else if (this.type === '3') {
      // 支付新增
      if (this.select === '1') {
        this.router.navigate(['cMain/addAddress'], {
          queryParams: {
            isAdd: 1,
            type: 3,
            // 选择新增
            select: 1,
            id: this.goodsId,
            quantity: this.quantity,
            groupId: this.groupId
          }
        });
      }
    } else if (this.type === '4') {
      console.log('123');
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 1,
          type: 4,
          // 选择新增
          select: 1,
          activityId: this.activityId
        }
      });
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 选择地址作为收货地址
   */
  selectAddress(item) {
    if (this.type === '2') {
      this.router.navigate(['cMain/pay'], {
        queryParams: {
          type: 2,
          select: 1,
          ids: this.ids,
          payType: this.payType,
          locationId: item.id
        }
      });
    } else if (this.type === '3') {
      this.router.navigate(['cMain/grouponPay'], {
        queryParams: {
          select: 1,
          id: this.goodsId,
          quantity: this.quantity,
          groupId: this.groupId,
          locationId: item.id
        }
      });
    } else if (this.type === '4') {
      this.isVisibleCouponOne = true;
      document.getElementsByClassName('ant-modal-footer')[1]['style'].cssText = 'text-align: center;';
      document.getElementsByClassName('ant-modal-close-x')[1]['style'].cssText = 'display: none;';
      document.getElementsByClassName('ant-modal-body')[1]['style'].cssText = 'padding: 4px 24px;';
      this.showName = item.receiver;
      this.showPhone = item.phone;
      this.showAddress = item.name;
      this.addressId = item.id;
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 选编辑地址
   */
  alterAddress(item) {
    if (this.type === '1') {
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 0,
          locationId: item.id,
          type: 1
        }
      });
    } else if (this.type === '2') {
      event.stopPropagation();
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 0,
          locationId: item.id,
          type: 2,
          ids: this.ids,
          payType: this.payType
        }
      });
    } else if (this.type === '3') {
      event.stopPropagation();
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          type: 3,
          isAdd: 0,
          id: this.goodsId,
          quantity: this.quantity,
          groupId: this.groupId,
          locationId: item.id
        }
      });
    } else if (this.type === '4') {
      event.stopPropagation();
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          type: 4,
          isAdd: 0,
          select: 1,
          activityId: this.activityId,
          locationId: item.id
        }
      });
    }

  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 是否确认删除地址弹框
   */
  delAddress(item) {
    this.delItem = item;
    document.getElementsByClassName('ant-modal-footer')[0]['style'].cssText = 'text-align: center;';
    this.isVisible = true;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 确认删除地址，关闭弹框
   */
  handleOk(): void {
    this.appService.postAliData(this.appProperties.shopAddressUpdateUrl, {
      receiver: this.delItem.receiver,
      name: this.delItem.name,
      phone: this.delItem.phone,
      defaultFlag: this.delItem.defaultFlag,
      deleteFlag: 1,
      sex: this.delItem.sex,
      id: this.delItem.id
    }, this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.getInit();
          this.isVisible = false;
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
   * 取消删除地址，关闭弹框
   */
  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 跳转页面
   */
  goTo() {
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&' +
        'redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&' +
        'state=/cMain/firstPage?vm=1-1';
    } else {
      if (this.type === '1') {
        this.router.navigate(['cMain/userCenter'], {
          queryParams: {
            type: 1
          }
        });
      } else if (this.type === '2') {
        this.router.navigate(['cMain/pay'], {
          queryParams: {
            ids: this.ids,
            payType: this.payType
          }
        });
      } else if (this.type === '3') {
        this.router.navigate(['cMain/grouponPay'], {
          queryParams: {
            id: this.ids,
            groupId: this.groupId,
            quantity: this.quantity
          }
        });
      } else if (this.type === '4') {
        this.router.navigate(['cMain/bargainList']);
      }
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 确认选择改地址为收货地址弹框
   */
  closeCoupon(val) {
    if (val === 0) {
      this.isVisibleCouponOne = false;
    } else if (val === 1) {
      this.appService.postAliData(this.appProperties.bargainShopAddUrl, {
        goodsBargainId: this.activityId,
        addressId: this.addressId
      }, this.token).subscribe(
        data => {
          if (data.status === 1) {
            this.bargainMoney = data.returnObject.privce;
            const id = data.returnObject.customerBargainId;
            window.location.href = 'http://webapp.youshuidaojia.com/cMain/bargainDetails?id=' + id + '&addressId=' + this.addressId + '&bargainMoney=' + this.bargainMoney + '&bargainShow=1&token=' + this.token;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else if (val === 2) {
      event.stopPropagation();
      this.isVisibleCouponTwo = false;
      this.isVisibleCouponThree = true;
      document.getElementsByClassName('ant-modal-body')[2]['style'].cssText = 'padding: 0;';
    } else if (val === 3) {
      this.isVisibleCouponThree = false;
    }
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭弹框
   */
  closeModel() {
    this.isVisibleCouponTwo = false;
    event.stopPropagation();
  }
}
