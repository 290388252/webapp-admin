import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  array = [
    '../../../../assets/main/raw_1529043263.png',
    '../../../../assets/main/raw_1529043326.png',
    '../../../../assets/main/raw_1529043367.png',
    '../../../../assets/main/raw_1529043422.png'
  ];
  public id;
  public name;
  public goodsObj = {};
  public goodsList = [];
  public imgUrl = this.appProperties.shopImgUrl;
  public imgList = [];
  public token;
  public curId: number;
  constructor( private appProperties: AppProperties, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.id = urlParse(window.location.href)['id'];
    this.name = urlParse(window.location.href)['name'];
    this.showGoods();
    this.curId = 3;
  }
  showGoods() {
    this.appService.postAliData(this.appProperties.shoppingGoodsDetailUrl, {id: 34}, getToken()).subscribe(
      data => {
        console.log(data);
        this.imgList = data.returnObject.pic.split(',');
        this.goodsObj = data.returnObject;
      },
      error => {
        console.log(error);
      }
    );
  }
  selected(flag) {
    this.curId = flag;
  }
  goTo() {
    if (urlParse(window.location.href)['type'] === '1') {
      this.router.navigate(['cMain/firstPage']);
    } else if (urlParse(window.location.href)['type'] === '2') {
      this.router.navigate(['cMain/allGoods']);
    }
  }
  orderTo() {
      this.appService.postAliData(this.appProperties.shoppingAddUrl, {
        itemId: this.id,
        num: 1,
        itemName: this.name
      }, getToken()).subscribe(
        data => {
          console.log(data);
          alert(data.message);
          if (data.status === 1) {
            this.router.navigate(['cMain/shopCar']);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
}
