import { Injectable } from '@angular/core';
import {urlParse} from '../../../utils/util';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {Router} from '@angular/router';

@Injectable()
export class ShopCarService {
  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {}
  showGoods(token) {
    const goodsList = [];
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, '', token).subscribe(
      data => {
        console.log(data);
        // this.goodsList = data.returnObject;
        data.returnObject.forEach(item => {
          goodsList.push(item);
        });
      },
      error => {
        console.log(error);
      }
    );
    return goodsList;
  }
  addCar(item, token) {
    this.appService.postAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, token).subscribe(
      data => {
        console.log(data);
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }
}
