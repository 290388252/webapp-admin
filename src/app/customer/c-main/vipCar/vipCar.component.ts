import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './vipCar.component.html',
  styleUrls: ['./vipCar.component.css']
})
export class VipCarComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public isConfirm;
  public disConfirm;
  public token;
  public vipMoney;
  // public vipCarList;
  constructor( private appProperties: AppProperties, private appService: AppService, private router: Router) { }

  ngOnInit() {
    // this.id = urlParse(window.location.href)['id'];
    this.token = getToken();
    this.isConfirm = false;
    this.disConfirm = false;
    this.vipMoney = 0.01;
    // this.getDate();
  }

  getDate() {
    // this.appService.postAliData(this.appProperties.shopVipCarListUrl, {}, this.token).subscribe(
    //   data => {
    //     console.log(123);
    //     if (data.status === 1) {
    //       this.vipCarList = data.returnObject;
    //       console.log(this.vipCarList);
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
  checkBox() {
    const check = document.getElementsByClassName('checkA');
    if (check[0]['checked']) {
      this.isConfirm = true;
      this.disConfirm = false;
    } else {
      this.isConfirm = false;
    }

  }
  disCheckBox() {
    this.isConfirm = false;
    this.disConfirm = true;
  }
  // 会员
  vipBuy(vipMoney) {
    this.router.navigate(['cMain/vipPay'], {
      queryParams: {
        vipMoney: vipMoney
      }});
  }
  goTo() {
    this.router.navigate(['cMain/firstPage']);
  }
}
