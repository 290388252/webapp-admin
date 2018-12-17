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
  img;
  abc;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.vmCode = urlParse(window.location.href)['vmCode'];
    // this.getTime();
    this.token = getToken();
    this.getDate();

  }

  getDate() {
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else {
      console.log('123');
      this.appService.postAliData(this.appProperties.shoppingPromotionsUrl, {'vmCode': this.vmCode}, this.token).subscribe(
        data => {
          if (data.status === 1) {
            console.log(data);
            this.couponList = data.returnObject;
            // this.abc = data.returnObject[0].themeImg;
            // this.img = 'background-image: url(\'' + this.imgUrl + this.abc + '\')';
            // document.getElementById('aaa').style.backgroundImage = 'url(' + this.imgUrl + this.abc + ')';
            // console.log( document.getElementById('aaa').style);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

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
