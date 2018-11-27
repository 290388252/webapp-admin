import {Component, AfterViewChecked, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-detail',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  public token;
  public success = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appProperties: AppProperties,
  private appService: AppService) {
  }

  ngOnInit() {
    // if (getToken() === null || getToken() === undefined) {
    //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&' +
    //     'redirect_uri=http://ym//://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&' +
    //     'scope=snsapi_userinfo&state=/cMain/getCoupon?vm=1';
    // } else {
    //   this.token = getToken();
    // }
  }
  // 获取订单列表
  getCoupon() {
    this.appService.postAliData(this.appProperties.couponAddAsianCustomer, '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.success = false;
        } else {
          alert(data.message);
        }
      }, error => {
        console.log(error);
      }
    );
  }
  close() {
    this.success = true;
  }
}
