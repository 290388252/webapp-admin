import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  public imgUrl = this.appProperties.promotionsImgUrl;
  public token;
  public vmCode;
  public couponList;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.vmCode = urlParse(window.location.href)['vmCode'];
    // this.getTime();
    this.token = getToken();
    this.getDate();

  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取优惠券list
   */
  getDate() {
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else {
      this.appService.postAliData(this.appProperties.shoppingPromotionsUrl, {'vmCode': this.vmCode}, this.token).subscribe(
        data => {
          if (data.status === 1) {
            this.couponList = data.returnObject;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 点击购买优惠券页面跳转
   */
  goTo(id) {
    if (id === '1') {
      if (getToken() === null || getToken() === undefined) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
      } else {
        this.router.navigate(['cMain/firstPage']);
      }
    } else {
      this.router.navigate(['cMain/detail'], {
        queryParams: {
          id: id
        }
      });
    }

  }
}
