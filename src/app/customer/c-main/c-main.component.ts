import { Component, OnInit } from '@angular/core';
import {getToken, urlParse} from '../../utils/util';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-c-main',
  templateUrl: './c-main.component.html',
  styleUrls: ['./c-main.component.css']
})
export class CMainComponent implements OnInit {
  public curId: number;
  public footerHidden = false;
  constructor(private router: Router) { }

  ngOnInit() {
    const url = window.location.href;
    url.indexOf('detail') !== -1 ? this.footerHidden = true : this.footerHidden = false;
    url.indexOf('getCoupon') !== -1 ? this.footerHidden = true : this.footerHidden = false;
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const refUrl = window.location.href;
        console.log(refUrl);
        console.log(refUrl.indexOf('detail'));
        refUrl.indexOf('detail') !== -1 ? this.footerHidden = true : this.footerHidden = false;
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
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1';
      } else {
        this.router.navigate(['cMain/firstPage']);
      }
    }
  }
}
