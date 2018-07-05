import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {AllGoodsService} from "./all-goods-service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.css']
})
export class AllGoodsComponent implements OnInit {
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  constructor(@Inject('showAllGoods') private allGoodsService, private appProperties: AppProperties) { }

  ngOnInit() {
    this.token = getToken();
    this.list = this.allGoodsService.showAllGoods(this.token, '');
    console.log(this.list);
  }
  sort(flag) {
    if (flag === 1) {
      this.list = this.allGoodsService.showAllGoods(this.token, '');
    } else if (flag === 2) {
      this.list = this.allGoodsService.showAllGoods(this.token, '');
    } else if (flag === 3) {
      this.list = this.allGoodsService.showAllGoods(this.token, {newProduct: 1});
    } else if (flag === 4) {
      this.list = this.allGoodsService.showAllGoods(this.token, {price: 1});
    }
  }
}
