import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.css']
})
export class AllGoodsComponent implements OnInit {
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  constructor(@Inject('showAllGoods') private allGoodsService, private appProperties: AppProperties,
              private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.token = getToken();
    this.list = this.allGoodsService.showAllGoods(this.token, {type: 3});
  }
  addCar(item) {
    this.appService.getAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 2) {
          alert(data.message);
          window.location.href = data.returnObject;
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  text(item) {
    return item.money === 0 ? '固定减扣券' : '满' + item.money + '元使用';
  }
  goTo(id, name) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        type: 2
      }});
  }
}
