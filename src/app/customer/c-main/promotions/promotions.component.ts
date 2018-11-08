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

  getDate() {
    this.appService.postAliData(this.appProperties.shoppingPromotionsUrl, {'vmCode': this.vmCode}, this.token).subscribe(
      data => {
        if (data.status === 1) {
          console.log(data);
          this.couponList = data.returnObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  goTo(id) {
    console.log(id);
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id
      }});
  }
}
