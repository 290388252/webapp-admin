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

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    this.getDate();
  }

  getDate() {
    this.appService.postAliData(this.appProperties.shopUserMoneyUrl, {}, this.token).subscribe(
      data => {
        console.log(123);
        if (data.status === 1) {
          this.userMoney = data.returnObject.userBalance;
          this.userIntegral = data.returnObject.integral;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  detail(flag) {
    if (flag === 1) {
      this.router.navigate(['cMain/myOrder']);
    } else if (flag === 2) {
      this.router.navigate(['cMain/coupon'], {
        queryParams: {
          coupon: 1
        }
      });
    } else if (flag === 3) {
      this.router.navigate(['cMain/shopCar']);
    } else if (flag === 4) {
      this.router.navigate(['cMain/newAddress']);
    } else if (flag === 5) {
      this.router.navigate(['cMain/mySaveWater']);
    } else if (flag === 6) {
      this.router.navigate(['cMain/prepaid']);
    } else if (flag === 7) {
      this.router.navigate(['cMain/cardMap']);
    } else if (flag === 8) {
      this.router.navigate(['cMain/waterCoupon'], {
        queryParams: {
          coupon: 1
        }
      });
    }
  }
}
