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
  public groupId;
  public pay;
  public quantity;
  public payList;
  public payShopCar;
  public payType;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.type = urlParse(window.location.href)['type'];
    console.log(this.type);
    this.ids = urlParse(window.location.href)['id'];
    this.groupId = urlParse(window.location.href)['groupId'];
    this.pay = urlParse(window.location.href)['pay'];
    this.quantity = urlParse(window.location.href)['quantity'];
    this.payShopCar = urlParse(window.location.href)['shopCar'];
    this.payList = urlParse(window.location.href)['idList'];
    this.token = getToken();
    this.getInit();
    const test = 'http://localhost:4202/cMain/newAddress?type=1&id=2';
    this.getParamsWithUrl(test);
  }

  getInit() {
    this.appService.postAliData(this.appProperties.shopAddressSelectUrl, '', this.token).subscribe(
      data => {
        data.returnObject === null ? this.emptyAddress = true : this.emptyAddress = false;
        if (!this.emptyAddress) {
          this.list = data.returnObject;
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
      },
      error => {
        console.log(error);
      }
    );
  }

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
          // this.router.navigate(['cMain/newAddress']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // 新增地址
  addAddress() {
    if (this.type === '4') {
      // 支付
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 1,
          idList: this.payList,
          type: 4,
          pay: this.pay
        }
      });
    } else if (this.type === '1') {
      // 个人中心
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 1,
          type: 1,
          idList: this.payList
        }
      });
    }

  }

  // 编辑地址
  alterAddress(item) {
    if (this.type === '1') {
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 0,
          id: item.id,
          alterName: item.receiver,
          alterSex: item.sex.toString(),
          alterPhone: item.phone,
          alterSite: item.name,
          alterSwitch: item.defaultFlag,
          type: 1
        }
      });
    } else if (this.type === '4') {
      this.router.navigate(['cMain/addAddress'], {
        queryParams: {
          isAdd: 0,
          id: item.id,
          alterName: item.receiver,
          alterSex: item.sex.toString(),
          alterPhone: item.phone,
          alterSite: item.name,
          alterSwitch: item.defaultFlag,
          type: 4,
          idList: this.payList,
          pay: this.pay
        }
      });
    }

  }

  // 删除
  delAddress(item) {
    this.delItem = item;
    document.getElementsByClassName('ant-modal-footer')[0]['style'].cssText = 'text-align: center;';
    this.isVisible = true;
  }

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

  handleCancel(): void {
    this.isVisible = false;
  }

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
      } else if (this.type === '4') {
        this.router.navigate(['cMain/pay'], {
          queryParams: {
            ids: this.payList,
            type: this.pay
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
      }
    }
  }
}
