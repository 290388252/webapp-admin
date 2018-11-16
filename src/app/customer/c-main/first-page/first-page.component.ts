import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {el} from "@angular/platform-browser/testing/src/browser_util";

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
  public height;
  public imgList = [];
  public currentPic = 0;
  public judgeVip;
  constructor( @Inject('firstPage') private firstPageService, private appProperties: AppProperties,
               private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
      document.cookie = 'shopToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    }
    this.showGoods(getToken());
    this.list = this.firstPageService.showGoods(getToken(), 1);
    this.getBannerHeight();
    this.judgeVip = false;
    this.getVip();
  }
  getVip() {
    this.appService.postAliData(this.appProperties.judgeVipUrl, {}, getToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.judgeVip = true;
        } else {
          this.judgeVip = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getBannerHeight() {
    const banner = document.getElementById('banner');
    this.height = (banner.offsetWidth) / 16 * 9 + 'px';
  }
  showGoods(token) {
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, {type: 2}, token).subscribe(
      data => {
        console.log(data);
        data.returnObject.forEach(item => {
          if (item.advertisingPic !== null && item.advertisingPic !== undefined && item.advertisingPic !== '') {
            this.imgList.push({id: item.id, name: item.name, bannerImg: item.advertisingPic});
          }
        });
        console.log(this.imgList);
        setInterval(() => {
          const num = (this.currentPic + 1) % this.imgList.length;
          this.currentPic = num;
        }, 5000);
      },
      error => {
        console.log(error);
      }
    );
  }
  changebanner(num) {
    this.currentPic = num;
  }
  addFirstCar(item) {
    console.log(this.list);
    console.log({
      itemId: item.id,
      num: 1,
      itemName: item.name
    });
    this.appService.getAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, getToken()).subscribe(
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
  goTo(id, name, pic) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        pic: pic,
        // isConglomerateCommodity: isConglomerateCommodity,
        type: 1
      }});
  }
  // 会员
  vipBuy() {
    this.router.navigate(['cMain/vipCar']);
  }
  turnToPage(val) {
    this.router.navigate(['cMain/allGoods'], {
      queryParams: {
        value: val,
      }});
  }
}
