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

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    this.getInit();
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
    this.router.navigate(['cMain/addAddress'], {
      queryParams: {
        isAdd: 1
      }
    });
  }

  // 编辑地址
  alterAddress(item) {
    this.router.navigate(['cMain/addAddress'], {
      queryParams: {
        isAdd: 0,
        id: item.id,
        alterName: item.receiver,
        alterSex: item.sex.toString(),
        alterPhone: item.phone,
        alterSite: item.name,
        alterSwitch: item.defaultFlag,
      }
    });
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
    // if (flag === 'userCenter') {
    this.router.navigate(['cMain/userCenter']);
    // } else if (flag === 'prepaidPay') {
    //   this.router.navigate(['cMain/prepaidPay']);
    // }
  }
}
