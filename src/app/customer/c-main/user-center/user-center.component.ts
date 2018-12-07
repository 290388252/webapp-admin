import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {
  public token;
  public userMoney;
  public userIntegral;
  public userName;
  public userImg;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    // this.getInfo();
    if (urlParse(window.location.search)['token'] === undefined) {
      this.token = getToken();
    } else {
      this.token = urlParse(window.location.search)['token'];
    }
    this.getDate();
  }

  getInfo() {
    const strUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/wechat/getUserInfo&response_type=code&scope=snsapi_userinfo&state=/cMain/userCenter-1-76';
    window.location.href = strUrl;
  }

  getDate() {
    this.appService.postAliData(this.appProperties.shopUserMoneyUrl, {}, this.token).subscribe(
      data => {
        console.log(123);
        if (data.status === 1) {
          if (data.returnObject.nickName === undefined || data.returnObject.nickName === ''
            || data.returnObject.nickName === null) {
            this.getInfo();
          }
          this.userMoney = data.returnObject.userBalance;
          this.userIntegral = data.returnObject.integral;
          this.userName = data.returnObject.nickname;
          this.userImg = data.returnObject.headimgurl;
        } else if (data.status === -99) {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  detail(flag) {
    if (flag === 1) {
      this.router.navigate(['cMain/prepaid']);
    } else if (flag === 2) {
      this.router.navigate(['cMain/myOrder']);
    } else if (flag === 3) {
      this.router.navigate(['cMain/mySaveWater']);
    } else if (flag === 4) {
      this.router.navigate(['cMain/coupon'], {
        queryParams: {
          coupon: 1
        }
      });
    } else if (flag === 5) {
      this.router.navigate(['cMain/waterCoupon'], {
        queryParams: {
          coupon: 1
        }
      });
    } else if (flag === 6) {
      this.router.navigate(['cMain/shopCar']);
    } else if (flag === 7) {
      this.router.navigate(['cMain/newAddress'], {
        queryParams: {
          type: 1
        }
      });
    } else if (flag === 8) {
      this.router.navigate(['cMain/cardMap']);
    } else if (flag === 9) {
      this.router.navigate(['cMain/myDeclaration']);
    }
  }
}
