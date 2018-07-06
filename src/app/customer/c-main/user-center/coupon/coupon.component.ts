import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  public empty: boolean;
  public unUsed: boolean;
  public unEffective: boolean;
  public effective: boolean;
  private token;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
    this.token = getToken();
    this.unUsed = true;
    if (this.unUsed) {
      this.empty = false;
    } else {
      this.empty = true;
    }
    console.log(this.unUsed);
    console.log(this.empty);
    this.appService.getAliData(this.appProperties.shopFrontCouponMyListUrl, '', this.token).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  choose(flag) {
    if (flag === 1) {
      this.unUsed = true;
      this.unEffective = false;
      this.effective = false;
    } else if (flag === 2) {
      this.unUsed = false;
      this.unEffective = true;
      this.effective = false;
    } else if (flag === 3) {
      this.unUsed = false;
      this.unEffective = false;
      this.effective = true;
    }
  }
  ok() {
  }
  useCard() {}
}
