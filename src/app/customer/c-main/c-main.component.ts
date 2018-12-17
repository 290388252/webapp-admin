import {Component, OnInit} from '@angular/core';
import {getToken, urlParse} from '../../utils/util';
import {NavigationEnd, Router} from '@angular/router';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-c-main',
  templateUrl: './c-main.component.html',
  styleUrls: ['./c-main.component.css']
})
export class CMainComponent implements OnInit {
  public curId: number;
  public footerHidden = false;
  public token = getToken();

  constructor(private router: Router, private appService: AppService, private appProperties: AppProperties) {
  }

  ngOnInit() {
    const url = window.location.href;
    if (url.indexOf('detail') !== -1 || url.indexOf('getCoupon') !== -1 ) {
      this.footerHidden = true;
    } else {
      this.footerHidden = false;
    }
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        const refUrl = window.location.href;
        refUrl.indexOf('detail') !== -1 ? this.footerHidden = true : this.footerHidden = false;
      }
    });
    if (url.indexOf('firstPage') > -1) {
      this.curId = 1;
    } else if (url.indexOf('allGoods') > -1) {
      this.curId = 2;
    } else if (url.indexOf('shopCar') > -1) {
      this.curId = 3;
    } else if (url.indexOf('userCenter') > -1) {
      this.curId = 4;
    } else {
      console.log('url');
      console.log(url);
      this.curId = 1;
    }
  }

  selected(flag) {
    this.curId = flag;
    if (flag === 1) {
      if (getToken() === null || getToken() === undefined) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
      } else {
        this.router.navigate(['cMain/firstPage']);
      }
    } else if (flag === 5) {
      const u = navigator.userAgent, app = navigator.appVersion;
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        window.location.href = 'http://webapp.youshuidaojia.com/cMain/scan';
      } else {
        this.appService.postScanData(this.appProperties.wechatShareInfoUrl, {url : window.location.href}
          // + '?url=http://webapp.youshuidaojia.com/cMain/firstPage?vmCode=' + urlParse(window.location.href)['vmCode'],
        ).subscribe(
          data => {
            console.log(data);
            console.log(window.location.href);
            wx.config({
              debug: false,
              appId: data.data.appId,
              timestamp: data.data.timestamp,
              nonceStr: data.data.nonceStr,
              signature: data.data.signature,
              jsApiList: ['checkJsApi',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'scanQRCode'
              ]
            });
            wx.ready(function () {
              console.log(123);
              wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                  console.log(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
                  window.location.href = res.resultStr;
                }
              });
            });
            wx.error(function (res) {
              console.log(res);
            });
          },
          error2 => {
            console.log(error2);
          }
        );
      }
    }
  }
}
