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
  public height;
  public imgList = [];
  public currentPic = 0;
  public judgeVip;

  constructor(@Inject('firstPage') private firstPageService, private appProperties: AppProperties,
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
    this.judgeVip = false;
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 判断是否是会员
   */
  getVip() {
    this.appService.postAliData(this.appProperties.judgeVipUrl, {}, getToken()).subscribe(
      data => {
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

  /**
   * 2019-02-14
   * @author maiziyao
   * 获取商品list集合
   */
  showGoods(token) {
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, {type: 2}, token).subscribe(
      data => {
        data.returnObject.forEach(item => {
          if (item.advertisingPic !== null && item.advertisingPic !== undefined && item.advertisingPic !== '') {
            this.imgList.push({id: item.id, name: item.name, bannerImg: item.advertisingPic});
          }
        });
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 滑动banner
   */
  changebanner(num) {
    this.currentPic = num;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 添加商品到购物车
   */
  addFirstCar(item) {
    this.appService.getAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, getToken()).subscribe(
      data => {
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进入商品详情页面
   */
  goTo(id, pic, spellgroupId, activityId) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        // name: endName,
        spellgroupId: spellgroupId,
        activityId: activityId,
        pic: pic,
        // isConglomerateCommodity: isConglomerateCommodity,
        type: 1
      }
    });
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进入拼团进行中或砍价免费拿或为您精选或优水购买页面
   */
  turnToPage(val) {
    if (val === 4) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/wechat/getCustomerToken&response_type=code&scope=snsapi_userinfo&state=:9800/main';
    } else {
      this.router.navigate(['cMain/recommendB'], {
        queryParams: {
          itemType: val,
        }
      });
    }
  }
}
