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
  // add
  public addName;
  public addSex;
  public addPhone;
  public addSite;
  public addSwitch;
  public addShow;
  public shopCar;
  public disable;
  public idList;
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
    this.isAdd = urlParse(window.location.href)['isAdd'];
    this.alterId = urlParse(window.location.href)['id'];
    this.shopCar = urlParse(window.location.href)['shopCar'];
    this.idList = urlParse(window.location.href)['idList'];
    this.alterName = urlParse(window.location.href)['alterName'];
    this.alterSex = urlParse(window.location.href)['alterSex'];
    this.alterPhone = urlParse(window.location.href)['alterPhone'];
    this.alterSite = urlParse(window.location.href)['alterSite'];
    this.alterSwitch = urlParse(window.location.href)['alterSwitch'];
    this.getInit();
  }

  goTo() {
    // if (flag === 'userCenter') {
    this.router.navigate(['cMain/newAddress']);
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
    }
    // else if (this.isAdd === '0') {
    //   this.appService.postAliData(this.appProperties.shopAddressCheckUrl + '?id=' + this.alterId, {}, this.token).subscribe(
    //     data => {
    //       if (data.status === 1) {
    //         this.alterName = data.returnObject.receiver;
    //         this.alterSex = data.returnObject.sex.toString();
    //         this.alterPhone = data.returnObject.phone;
    //         this.alterSite = data.returnObject.name;
    //         this.alterSwitch = data.returnObject.defaultFlag;
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // }
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
          if (this.shopCar === '1') {
            this.router.navigate(['cMain/pay'], {
              queryParams: {
                ids: this.idList
              }
            });
          } else {
            this.router.navigate(['cMain/newAddress']);
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
    if (this.alterSwitch === false) {
      alterSwitch = 0;
    } else {
      alterSwitch = 1;
    }
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
          this.router.navigate(['cMain/newAddress']);
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
