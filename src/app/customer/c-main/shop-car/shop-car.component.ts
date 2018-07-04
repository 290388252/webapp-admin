import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.css']
})
export class ShopCarComponent implements OnInit {
  array = [
    'http://119.23.233.123:6662/ys_admin/files/0.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000080.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000081.png',
    'http://119.23.233.123:6662/ys_admin/files/0.png'
  ];
  public data = [];
  public totalPrice = 0;
  public empty: boolean;
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1MzA2NzY4NzZ9.m2B-ryVZhqwOEqC-9fm42M00oLvF_BaXxHlWw56ZdDiwoKZ2TmLxymF_bb8Wj448y5XrDKBYA1K9CGd7Nh6PKg';
  constructor( @Inject('shopCarList') private shopCarService, private appService: AppService, private appProperties: AppProperties) { }

  ngOnInit() {
    this.list = this.shopCarService.showGoods(this.token);
    this.showShopCarList();
    console.log(this.list);
  }
  add(item) {
    item.num ++;
    this.update(item, this.token);
    console.log(item);
  }
  delete(item) {
    item.num --;
    this.update(item, this.token);
    // if (item.num < 1) {
    //   this.totalPrice = 0;
    //   this.remove(item);
    //   this.data.forEach(items => {
    //     this.totalPrice += items.price * item.num;
    //   });
    //   if (this.data.length <= 0) {
    //     this.empty = true;
    //   }
    //   console.log(this.data);
    // }
  }
  addCar(item) {
    console.log(item);
    this.shopCarService.addCar(item, this.token);
    this.showShopCarList();
  }
  // --------------------------------------------------------移除数组元素
  remove(item) {
    const index = this.indexOf(item);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }
  indexOf(item) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === item) {
        return i;
      }
    }
    return -1;
  }
  // --------------------------------------------------------移除数组元素
  update(item, token) {
    this.appService.postAliData(this.appProperties.shoppingUpdateUrl, {
      id: item.id,
      itemId: item.itemId,
      num: item.num,
      itemName: item.itemName
    }, token).subscribe(
      data => {
        console.log(data);
        alert(data.message);
        this.totalPrice = 0;
        this.showShopCarList();
      },
      error => {
        console.log(error);
      }
    );
  }
  showShopCarList() {
    this.appService.postAliData(this.appProperties.shoppingCarUrl, '', this.token).subscribe(
      data => {
        console.log(data);
        this.data = data.returnObject;
        this.data.forEach(item => {
          this.totalPrice += item.price * item.num;
        });
        this.data.length <= 0 ? this.empty = true : this.empty = false;
        console.log(this.data);
        console.log(this.totalPrice);
      },
      error => {
        console.log(error);
      }
    );
  }
}
