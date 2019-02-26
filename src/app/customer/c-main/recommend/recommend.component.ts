import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  public list;
  public couponList = [];
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public value;

  constructor(@Inject('showRecommend') private recommendService, private appProperties: AppProperties,
              private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.value = urlParse(window.location.href)['value'];
    this.token = getToken();
    if (this.value === '1') {
      this.list = this.recommendService.showRecommend(this.token, {type: 3, itemType: 11});
    } else if (this.value === '2') {
      this.list = this.recommendService.showRecommend(this.token, {type: 3, itemType: 24});
    } else if (this.value === '3') {
      this.coupon();
    } else if (this.value === '4') {
      /*this.list = this.RecommendService.showRecommend(this.token, {price: 1, type: 3});*/
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 添加商品到购物车
   */
  addCar(item) {
    this.appService.getAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, this.token).subscribe(
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
   * 获取优惠券list
   */
  coupon() {
    this.appService.getAliData(this.appProperties.shopFrontCouponMyListUrl, {state: 1}, this.token).subscribe(
      data => {
        this.couponList = data.returnObject;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 转换优惠信息
   */
  text(item) {
    return item.money === 0 ? '固定减扣券' : '满' + item.money + '元使用';
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 领取优惠券
   */
  pickCard(item) {
    this.appService.postAliData(this.appProperties.shopFrontCouponAddCouponToCustomerUrl + '?couponId=' + item.id, '', this.token).subscribe(
      data => {
        this.coupon();
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 转换日期格式 兼容ios
   */
  toDate(date) {
    return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate();
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 跳转页面
   */
  goTo(id, name) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        type: 2
      }
    });
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 判断仅限特殊商品使用还是全品类券
   */
  turnToBind(item, useWhere) {
    let isShow;
    if (item === 1) {
      // 特殊商品
      if (useWhere === 1) {
        //  机器商品
        isShow = false;
        return isShow;
      } else {
        isShow = true;
        return isShow;
      }
    } else if (item === 0) {
      // 全品类
      isShow = false;
      return isShow;
    }
  }
}
