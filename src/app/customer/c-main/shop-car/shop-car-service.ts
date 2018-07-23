import {Injectable, OnInit} from '@angular/core';
import {urlParse} from '../../../utils/util';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {Router} from '@angular/router';

@Injectable()
export class ShopCarService implements OnInit {
  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {}
  ngOnInit(): void {
  }
  showGoods(token) {
    const goodsList = [];
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, {type: 1}, token).subscribe(
      data => {
        console.log(data);
        // this.goodsList = data.returnObject;
        data.returnObject.forEach(item => {
          item.pic = item.pic.split(',')[0];
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
