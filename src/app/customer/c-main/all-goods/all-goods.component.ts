import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.css']
})
export class AllGoodsComponent implements OnInit {
  public list;
  public couponList = [];
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public unUsed;
  constructor(@Inject('showAllGoods') private allGoodsService, private appProperties: AppProperties,
              private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.token = getToken();
    this.list = this.allGoodsService.showAllGoods(this.token, {type: 3});
    console.log(this.list);
  }
  sort(flag) {
    if (flag === 1) {
      this.list = this.allGoodsService.showAllGoods(this.token, {type: 3});
      this.unUsed = false;
    } else if (flag === 2) {
      this.list = this.allGoodsService.showAllGoods(this.token, {type: 3});
      this.unUsed = false;
    } else if (flag === 3) {
      this.list = this.allGoodsService.showAllGoods(this.token, {newProduct: 1, type: 3});
      this.unUsed = false;
    } else if (flag === 4) {
      this.list = this.allGoodsService.showAllGoods(this.token, {price: 1, type: 3});
      this.unUsed = false;
    } else if (flag === 5) {
      this.unUsed = true;
      this.coupon();
    }
  }
  addCar(item) {
    this.appService.postAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, this.token).subscribe(
      data => {
        console.log(data);
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }
  coupon() {
    this.appService.getAliData(this.appProperties.shopFrontCouponMyListUrl, {state: 1}, this.token).subscribe(
      data => {
        console.log(data);
          this.couponList = data.returnObject;
      },
      error => {
        console.log(error);
      }
    );
  }
  text(item) {
    return item.money === 0 ? '固定减扣券' : '满' + item.money + '元使用';
  }
  pickCard(item) {
    this.appService.postAliData(this.appProperties.shopFrontCouponAddCouponToCustomerUrl + '?couponId=' + item.id, '', this.token).subscribe(
      data => {
        console.log(data);
        this.coupon();
      },
      error => {
        console.log(error);
      }
    );
  }
  toDate(date) {
    return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate();
  }
  goTo(id, name) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        type: 2
      }});
  }
}
