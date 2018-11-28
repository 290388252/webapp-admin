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
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
      document.cookie = 'shopToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    } else {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&' +
        'redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&' +
        'scope=snsapi_userinfo&state=/cMain/getCoupon?vm=1&type=3';
    }
  }
  // 获取订单列表
  getCoupon() {
    // this.success = false;
    this.appService.postAliData(this.appProperties.couponAddAsianCustomer, '', urlParse(window.location.search)['token']).subscribe(
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
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
          WeixinJSBridge.call('closeWindow');
      }
    } else if (ua.match(/AlipayClient/i)) {
      if (ua.match(/AlipayClient/i)[0] === 'alipayclient') {
          window['AlipayJSBridge'].call('closeWebview');
      }
    }
  }
}
