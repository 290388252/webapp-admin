import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {isCombinedNodeFlagSet} from 'tslint';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './recommendB.component.html',
  styleUrls: ['./recommendB.component.css']
})
export class RecommendBComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  // get
  //
  public goodsList = [];
  public bargainGoodsFindCustomerList = [];
  public bargainGoodsList = [];
  public timerList = [];
  public itemType;


  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnDestroy() {
    if (this.timerList.length !== 0) {
      this.timerList.forEach(timer => {
        clearInterval(timer);
        console.log('取消计时器');
      });
    }
  }

  ngOnInit() {
    this.itemType = urlParse(window.location.href)['itemType'];
    if (getToken() !== null && getToken() !== undefined && getToken() !== '') {
      this.token = getToken();
    } else if (urlParse(window.location.href)['token'] !== null && urlParse(window.location.href)['token'] !== undefined
      && urlParse(window.location.href)['token'] !== '') {
      this.token = urlParse(window.location.href)['token'];
    }
    if (this.itemType.toString() === '0' || this.itemType.toString() === '1') {
      this.getData();
    } else if (this.itemType.toString() === '2') {
      this.getBargin();
    }

  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 获取为你精选list及拼团list
   */
  getData() {
    this.appService.postAliData(this.appProperties.shoppingGoodsUrl, {itemType: this.itemType}, this.token).subscribe(
      data => {
        data.returnObject.forEach(item => {
          item.pic = item.pic.split(',')[0];
          this.goodsList.push(item);
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 获取拼团list
   */
  getBargin() {
    this.appService.postAliData(this.appProperties.bargainSponsorBargainListUrl, '', this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.bargainGoodsFindCustomerList = data.returnObject.bargainGoodsFindCustomerList;
          this.bargainGoodsList = data.returnObject.bargainGoodsList;
          if (this.bargainGoodsFindCustomerList.length > 0) {
            for (let i = 0; i < this.bargainGoodsFindCustomerList.length; i++) {
              const endTime = (new Date(this.bargainGoodsFindCustomerList[i].endTime.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
              this.countDown(endTime, function (msg) {
                document.getElementById('timer' + i).innerHTML = msg;
              });
            }
          }
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
   * 继续砍价
   */
  to(id) {
    window.location.href = 'http://webapp.youshuidaojia.com/cMain/bargainDetails?id=' + id + '&select=1&token=' + this.token;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进入商品砍价详情
   */
  details(id) {
    window.location.href = 'http://webapp.youshuidaojia.com/cMain/bargain?orderId=' + id + '&token=' + this.token;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 点击去砍价
   */
  toCreate(activityId) {
    this.appService.postFormData(this.appProperties.bargainJudgeJoinedUrl, {id: activityId}, this.token).subscribe(
      data => {
        if (data.status === 1) {
          window.location.href = 'http://webapp.youshuidaojia.com/cMain/newAddress?type=4&activityId=' + activityId + '&select=1&token=' + this.token;
        } else {
          alert(data.message);
          return;
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
   * 倒计时
   */
  countDown(maxtime, fn) {
    const timer = setInterval(function () {
      if (maxtime >= 0) {
        const hours = Math.floor(maxtime / (60 * 60));
        const minutes = Math.floor(maxtime / 60) - (hours * 60);
        const seconds = Math.floor(maxtime % 60);
        let endHour;
        let endMinutes;
        let endSeconds;
        if (hours <= 9) {
          endHour = '0' + hours;
        } else {
          endHour = hours;
        }
        if (minutes <= 9) {
          endMinutes = '0' + minutes;
        } else {
          endMinutes = minutes;
        }
        if (seconds <= 9) {
          endSeconds = '0' + seconds;
        } else {
          endSeconds = seconds;
        }
        const msg = '剩余:' + endHour + ':' + endMinutes + ':' + endSeconds;
        fn(msg);
        --maxtime;
      } else {
        clearInterval(timer);
        fn('已结束!');
        this.maxTimer = -999;
      }
    }, 1000);
    this.timerList.push(timer);
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进入商品详情
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
  /**
   * 2019-02-15
   * @author maiziyao
   * 添加商品至购物车
   */
  addFirstCar(item) {
    event.stopPropagation();
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
   * 转换时间格式
   */
  // turnData(date) {
  //   const nowDate = new Date(date);
  //   const nowY = nowDate.getFullYear();
  //   const nowM = nowDate.getMonth() + 1;
  //   const nowD = nowDate.getDate();
  //   const endTime = nowY + '' + (nowM < 10 ? '0' + nowM : nowM) + '' + (nowD < 10 ? '0' + nowD : nowD);
  //   return endTime;
  // }
}
