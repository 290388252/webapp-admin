import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  public token: string;
  public isAdd;
  public alterId;
  public type;
  public payType;
  public ids;
  public select;
  // add
  public addName;
  public addSex;
  public addPhone;
  public addSite;
  public addSwitch;
  public addShow;
  public shopCar;
  public disable;
  public goodsId;
  public quantity;
  public groupId;

// alter
  public alterName;
  public alterSex;
  public alterPhone;
  public alterSite;
  public alterSwitch;
  public alterShow;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    // 1：个人中心 2：支付 3：团购
    this.type = urlParse(window.location.href)['type'];
    // isAdd 1：新增 0：编辑
    this.isAdd = urlParse(window.location.href)['isAdd'];
    this.select = urlParse(window.location.href)['select'];
    // pay
    this.ids = urlParse(window.location.href)['ids'];
    this.payType = urlParse(window.location.href)['payType'];
    //
    this.alterId = urlParse(window.location.href)['locationId'];
    // this.shopCar = urlParse(window.location.href)['shopCar'];
    // this.idList = urlParse(window.location.href)['idList'];
    // this.pay = urlParse(window.location.href)['pay'];
    // groupon
    this.goodsId = urlParse(window.location.href)['id'];
    this.quantity = urlParse(window.location.href)['quantity'];
    this.groupId = urlParse(window.location.href)['groupId'];
    //
    // this.alterName = urlParse(window.location.href)['alterName'];
    // this.alterSex = urlParse(window.location.href)['alterSex'];
    // this.alterPhone = urlParse(window.location.href)['alterPhone'];
    // this.alterSite = urlParse(window.location.href)['alterSite'];
    // this.alterSwitch = urlParse(window.location.href)['alterSwitch'];
    this.getInit();
  }

  goTo() {
    // if (flag === 'userCenter') {
    if (this.type === '1') {
      this.router.navigate(['cMain/newAddress'], {
        queryParams: {
          type: 1
        }
      });
    } else if (this.type === '2') {
      if (this.select === '1' || this.isAdd === '0') {
        this.router.navigate(['cMain/newAddress'], {
          queryParams: {
            type: 2,
            select: 1,
            ids: this.ids,
            payType: this.payType
          }
        });
      } else {
        this.router.navigate(['cMain/pay'], {
          queryParams: {
            ids: this.ids,
            payType: this.payType
          }
        });
      }
    } else if (this.type === '3') {
      if (this.select === '1' || this.isAdd === '0') {
        this.router.navigate(['cMain/newAddress'], {
          queryParams: {
            type: 3,
            select: 1,
            id: this.goodsId,
            quantity: this.quantity,
            groupId: this.groupId
          }
        });
      } else {
        this.router.navigate(['cMain/grouponPay'], {
          queryParams: {
            id: this.goodsId,
            quantity: this.quantity,
            groupId: this.groupId
          }
        });
      }
    }

    // } else if (flag === 'prepaidPay') {
    //   this.router.navigate(['cMain/prepaidPay']);
    // }
  }

  getInit() {
    if (this.isAdd === '1') {
      this.addName = undefined;
      this.addSex = '1';
      this.addPhone = undefined;
      this.addSite = undefined;
      this.addSwitch = false;
      this.addShow = false;
      this.disable = false;
    } else if (this.isAdd === '0') {
      this.appService.postAliData(this.appProperties.shopAddressCheckUrl + '?id=' + this.alterId, {}, this.token).subscribe(
        data => {
          if (data.status === 1) {
            this.alterName = data.returnObject.receiver;
            this.alterSex = data.returnObject.sex.toString();
            this.alterPhone = data.returnObject.phone;
            this.alterSite = data.returnObject.name;
            this.alterSwitch = data.returnObject.defaultFlag;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  addAddress() {
    this.disable = true;
    if (this.addName === undefined || this.addName === null || this.addName === ''
      || this.addPhone === undefined || this.addPhone === null || this.addPhone === ''
      || this.addSite === undefined || this.addSite === null || this.addSite === '') {
      this.addShow = true;
      this.disable = false;
      return;
    } else {
      this.addShow = false;
    }
    let addSwitch;
    if (this.addSwitch === false) {
      addSwitch = 0;
    } else {
      addSwitch = 1;
    }
    this.appService.postAliData(this.appProperties.shopAddressAddUrl, {
      receiver: this.addName,
      name: this.addSite,
      phone: this.addPhone,
      defaultFlag: addSwitch,
      deleteFlag: 0,
      sex: this.addSex
    }, this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.disable = false;
          if (this.type === '1') {
            // 个人中心
            this.router.navigate(['cMain/newAddress'], {
              queryParams: {
                type: 1
              }
            });
          } else if (this.type === '2') {
            // 支付
            if (this.select === '1') {
              this.router.navigate(['cMain/newAddress'], {
                queryParams: {
                  select: 1,
                  type: 2,
                  ids: this.ids,
                  payType: this.payType
                }
              });
            } else {
              this.router.navigate(['cMain/pay'], {
                queryParams: {
                  ids: this.ids,
                  payType: this.payType
                }
              });
            }
          } else if (this.type === '3') {
            if (this.select === '1') {
              this.router.navigate(['cMain/newAddress'], {
                queryParams: {
                  type: 3,
                  select: 1,
                  goodsId: this.goodsId,
                  quantity: this.quantity,
                  groupId: this.groupId
                }
              });
            } else {
              this.router.navigate(['cMain/grouponPay'], {
                queryParams: {
                  select: 1,
                  id: this.goodsId,
                  quantity: this.quantity,
                  groupId: this.groupId
                }
              });
            }

          }
        } else {
          this.disable = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  alterAddress() {
    if (this.alterName === undefined || this.alterName === null || this.alterName === ''
      || this.alterPhone === undefined || this.alterPhone === null || this.alterPhone === ''
      || this.alterSite === undefined || this.alterSite === null || this.alterSite === '') {
      this.alterShow = true;
      return;
    } else {
      this.alterShow = false;
    }
    let alterSwitch;
    if (this.alterSwitch === true) {
      alterSwitch = 1;
    } else {
      alterSwitch = 0;
    }
    console.log(this.alterSwitch);
    console.log(alterSwitch);
    this.appService.postAliData(this.appProperties.shopAddressUpdateUrl, {
      receiver: this.alterName,
      name: this.alterSite,
      phone: this.alterPhone,
      defaultFlag: alterSwitch,
      deleteFlag: 0,
      sex: this.alterSex,
      id: this.alterId
    }, this.token).subscribe(
      data => {
        if (data.status === 1) {
          alert('修改成功!');
          if (this.type === '1') {
            // 个人中心
            this.router.navigate(['cMain/newAddress'], {
              queryParams: {
                type: 1
              }
            });
          } else if (this.type === '2') {
            this.router.navigate(['cMain/newAddress'], {
              queryParams: {
                type: 2,
                ids: this.ids,
                select: 1,
                payType: this.payType
              }
            });
          } else if (this.type === '3') {
            this.router.navigate(['cMain/newAddress'], {
              queryParams: {
                type: 3,
                select: 1,
                goodsId: this.goodsId,
                quantity: this.quantity,
                groupId: this.groupId
              }
            });
          }
          // else if (this.type === '2') {
          //   this.router.navigate(['cMain/newAddress'], {
          //     queryParams: {
          //       type: 4,
          //       idList: this.idList,
          //       pay: this.pay
          //     }
          //   });
          // }
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
