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
  public empty: boolean;
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1MzA2MDk3MTh9.4158QMQyIJpzdZzKLf6cJqWXPhZiYE8cGqJbsTI_vS8qBoC70pjSbsAoTJ4rODTNLDdN7Fd2RsZXEqHi54uRWQ';
  constructor( @Inject('shopCarList') private shopCarService, private appService: AppService, private appProperties: AppProperties) { }

  ngOnInit() {
    this.list = this.shopCarService.showGoods(this.token);
      this.appService.postAliData(this.appProperties.shoppingCarUrl, '', this.token).subscribe(
        data => {
          console.log(data);
          this.data = data.returnObject;
          if (this.data.length <= 0) {
            this.empty = true;
          } else {
            this.empty = false;
          }
          console.log(this.data);
        },
        error => {
          console.log(error);
        }
      );
    console.log(this.list);
  }
  add(item) {
    item.num ++;
    console.log(item);
  }
  delete(item) {
    item.num --;
    if (item.num < 1) {
      this.remove(item);
      console.log(this.data);
    }
  }
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
}
