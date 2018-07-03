import { Injectable } from '@angular/core';
import {urlParse} from '../../../utils/util';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {Router} from '@angular/router';

@Injectable()
export class AllGoodsService {
  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {}
  showAllGoods(token, obj) {
    const goodsList = [];
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, obj, token).subscribe(
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
}
