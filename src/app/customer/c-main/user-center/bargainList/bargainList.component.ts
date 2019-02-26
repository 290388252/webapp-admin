import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {ElementRef} from '@angular/core';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './bargainList.component.html',
  styleUrls: ['./bargainList.component.css']
})
export class BargainListComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public orderId;
  //
  public isFocusA;
  public isFocusB;
  public bargainGoodsFindCustomerList = [];
  public bargainGoodsList = [];
  public timerList = [];

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService, private el: ElementRef) {
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
    this.token = getToken();
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
        const msg = endHour + ':' + endMinutes + ':' + endSeconds + '后结束';
        fn(msg);
        // if (maxtime == 5 * 60) alert('注意，还有5分钟!');
        --maxtime;
      } else {
        clearInterval(timer);
        fn('已结束!');
      }
    }, 1000);
    this.timerList.push(timer);
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 返回个人中心
   */
  goTo() {
    this.router.navigate(['user'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进入砍价商品详情
   */
  goodsDetails(id) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        type: 4
      }
    });
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 返回个人中心
   */
  to(id) {
    window.location.href = 'http://webapp.youshuidaojia.com/cMain/bargainDetails?id=' + id + '&select=1&token=' + this.token;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 查看订单详情
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
}
