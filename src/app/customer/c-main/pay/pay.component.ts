import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public totalPrice;
  public num = 0;
  public data;
  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) { }

  ngOnInit() {
    this.token = getToken();
    this.showShopCarPrice();
    console.log(this.list);
  }
  button(flag) {
    if (flag === 1) {
      console.log('pay');
    } else if (flag === 2) {
      history.back();
    }
  }
  showShopCarPrice() {
    this.appService.postAliData(this.appProperties.shoppingCarUrl, '', this.token).subscribe(
      data => {
        console.log(data);
        this.totalPrice = 0;
        this.data = data.returnObject;
        this.data.forEach(item => {
          this.totalPrice += item.price * item.num;
          this.num += item.num;
        });
        console.log(this.data);
        console.log(this.totalPrice);
      },
      error => {
        console.log(error);
      }
    );
  }
}
