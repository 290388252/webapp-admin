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
  public goodsList = [];
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  constructor( private appProperties: AppProperties, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.id = urlParse(window.location.href)['id'];
    this.showGoods();
  }
  showGoods() {
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        this.goodsList = data.returnObject;
        data.returnObject.forEach(item => {
          if (item.id === Number.parseInt(this.id)) {
            console.log(item.details);
            const d = document.getElementById('desk');
            d.innerHTML = d.innerHTML + item.details;
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  addFirstCar(item) {
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
  goTo() {
    if (urlParse(window.location.href)['type'] === '1') {
      this.router.navigate(['cMain/firstPage']);
    } else if (urlParse(window.location.href)['type'] === '2') {
      this.router.navigate(['cMain/allGoods']);
    }
  }
}
