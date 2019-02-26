import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@ Component({
  selector: 'app-user-detail',
  templateUrl: './my-saveWater.component.html',
  styleUrls: ['./my-saveWater.component.css']
})
export class MySaveWaterComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public empty: boolean;
  public token;
  public data;

  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router ) {
  }

  ngOnInit() {
    this.token = getToken();
    this.appService.postAliData(this.appProperties.shopCustomerGetStockUrl, '', this.token).subscribe(
      data => {
        this.data = data;
        this.data.forEach(item => {
          item.pic = item.pic.split(',')[0];
        });
        this.data.length <= 0 ? this.empty = true : this.empty = false;
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 返回首页
   */
  goto() {
    this.router.navigate(['cMain/firstPage']);
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 添加商品到购物车
   */
  addFirstCar(item) {
    this.appService.postAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.itemId,
      num: 1,
      itemName: item.itemName
    }, getToken()).subscribe(
      data => {
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 跳转页面查看消费记录
   */
  record(item) {
    this.router.navigate(['cMain/waterRecord'], {
      queryParams: {
        id: item.itemId,
        pic: item.pic,
        name: item.itemName
      }});
  }
}
