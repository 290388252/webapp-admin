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

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    this.isConfirm = false;
    this.disConfirm = false;
    this.vipMoney = 100;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 购买vip会员
   */
  vipBuy(vipMoney) {
    this.router.navigate(['cMain/vipPay'], {
      queryParams: {
        vipMoney: vipMoney
      }
    });
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 返回首页
   */
  goTo() {
    this.router.navigate(['cMain/firstPage']);
  }
}
