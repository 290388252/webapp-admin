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
  array = [
    'http://119.23.233.123:6662/ys_admin/files/0.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000080.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000081.png',
    'http://119.23.233.123:6662/ys_admin/files/0.png'
  ];
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1MzA2MDk3MTh9.4158QMQyIJpzdZzKLf6cJqWXPhZiYE8cGqJbsTI_vS8qBoC70pjSbsAoTJ4rODTNLDdN7Fd2RsZXEqHi54uRWQ';
  constructor(@Inject('showAllGoods') private allGoodsService, private appProperties: AppProperties) { }

  ngOnInit() {
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
