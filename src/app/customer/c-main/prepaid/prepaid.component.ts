import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './prepaid.component.html',
  styleUrls: ['./prepaid.component.css']
})
export class PrepaidComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userMoney;
  public userIntegral;
  constructor( private appProperties: AppProperties, private appService: AppService, private router: Router) { }

  ngOnInit() {
    // this.id = urlParse(window.location.href)['id'];
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
  goTo(flag) {
    console.log(flag === 'prepaidPay');
    if (flag === 'userCenter') {
      this.router.navigate(['cMain/userCenter']);
    } else if (flag === 'prepaidPay') {
      this.router.navigate(['cMain/prepaidPay']);
    }

  }
}
