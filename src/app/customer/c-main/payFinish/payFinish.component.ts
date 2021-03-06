import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {Router} from '@angular/router';
import {getToken, urlParse} from '../../../utils/util';

@Component({
  selector: 'app-pay-finish',
  templateUrl: './payFinish.component.html',
  styleUrls: ['./payFinish.component.css']
})
export class PayFinishComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public payShowList;
  public grouponList;
  public wechatVisible: boolean;
  public token;
  public couponId;
  public couponName;
  public follow;
  public price;
  public sumDeductionMoney;
  public payType;

  public type;
  public startTime;
  public endTime;
  public name;
  public typeLabel;
  public useWhereLabel;
  public deductionMoney;
  public bindProduct;
  public maximumDiscount;
  public memberMoney;

  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {
    this.wechatVisible = false;
    // alert(this.token);
    if (urlParse(window.location.search)['token']) {
      this.token = urlParse(window.location.search)['token'];
    } else {
      this.token = getToken();
    }
    this.getDataList();
  }

  ngOnInit() {
    this.wechatVisible = false;
    this.getDataList();
  }

  // getInit() {
  //   this.wechatVisible = false;
  //   this.token = getToken();
  //   // this.token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiNTM1LDEiLCJleHAiOjE1NDE1ODUwNjl9.DHrOVcgeBz6-w0lXl4nTwCuRFf32bBuT2XM2dQSnOuy7-8XSiW3VSm6PoLrK2lcfmaoKrQJ1laj6M_RvUfdBUg';
  //   this.getDataList();
  // }
  /**
   * 2019-02-15
   * @author maiziyao
   * 支付完成页面，获取订单详情
   */
  getDataList() {
    this.appService.getData(this.appProperties.payFinishShowUrl, {
      token: this.token
    }).subscribe(
      data => {
        this.payType = data.payType;
        this.couponId = data.couponId;
        this.couponName = data.couponName;
        this.follow = data.follow;
        this.price = data.price;
        this.memberMoney = data.memberMoney;
        this.sumDeductionMoney = data.sumDeductionMoney;
      },
      error => {
        console.log(error);
      }
    );
    this.appService.postAliData(this.appProperties.payFinishGrouponUrl, {
      type: 4
    }, this.token).subscribe(
      data => {
        this.grouponList = data.returnObject;
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
  exit() {
    this.router.navigate(['cMain/firstPage']);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 查看提水券
   */
  showWaterPaper() {
    // 跳转到我的提水券页面
    this.router.navigate(['cMain/waterCoupon'], {
      queryParams: {
        coupon: 1
      }
    });
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 查看该订单使用的优惠券
   */
  openDrawer() {
    const model = document.getElementById('myModel');
    const closed = document.getElementById('closed');
    model.style.display = 'block';
    document.body.style.overflow = 'hidden';
    window.addEventListener('click', function (event) {
      if (event.target === closed || event.target === model) {
        model.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    if (this.couponId) {
      this.appService.getData(this.appProperties.payFinishGetCouponUrl, {
        id: this.couponId,
        token: this.token
      }).subscribe(
        data => {
          this.startTime = (data.startTime).slice(0, 11);
          this.endTime = (data.endTime).slice(0, 11);
          this.type = data.type;
          this.typeLabel = data.typeLabel;
          this.useWhereLabel = data.useWhereLabel;
          this.deductionMoney = data.deductionMoney;
          this.bindProduct = data.bindProduct;
          this.maximumDiscount = data.maximumDiscount;
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 查看该订单使用的优惠券
   */
  sureModel() {
    const model = document.getElementById('myModel');
    model.style.display = 'none';
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 查看可使用的优惠券弹框
   */
  openShowModel() {
    this.wechatVisible = true;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭可使用的优惠券弹框
   */
  showCancel() {
    this.wechatVisible = false;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进去商品详情
   */
  goTo(id, pic, spellgroupId) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        spellgroupId: spellgroupId,
        pic: pic,
        type: 1
      }
    });
  }
}
