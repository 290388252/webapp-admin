import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  array = [
    '../../../../assets/main/raw_1529043263.png',
    '../../../../assets/main/raw_1529043326.png',
    '../../../../assets/main/raw_1529043367.png',
    '../../../../assets/main/raw_1529043422.png'
  ];
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public imgList = [];
  constructor( @Inject('firstPage') private firstPageService, private appProperties: AppProperties,
               private appService: AppService, private router: Router) { }

  ngOnInit() {
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
      document.cookie = 'shopToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    }
    this.showGoods(getToken());
    this.list = this.firstPageService.showGoods(getToken(), 1);
  }
  showGoods(token) {
    const goodsList = [];
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, {type: 2}, token).subscribe(
      data => {
        console.log(data);
        const list = [];
        // this.goodsList = data.returnObject;
        data.returnObject.forEach(item => {
          list.push(item.pic.split(','));
        });
        this.imgList = list.join(',').split(',');
        console.log(this.imgList);
      },
      error => {
        console.log(error);
      }
    );
    return goodsList;
  }
  addFirstCar(item) {
    console.log(this.list);
    console.log({
      itemId: item.id,
      num: 1,
      itemName: item.name
    });
    this.appService.postAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, getToken()).subscribe(
      data => {
        console.log(data);
        alert(data.message);
      },
      error => {
        console.log(error);
      }
    );
  }
  goTo(id, name) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        type: 1
      }});
  }
}
