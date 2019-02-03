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
  templateUrl: './grouponInPayFinish.component.html',
  styleUrls: ['./grouponInPayFinish.component.css']
})
export class GrouponInPayFinishComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  // get
  //
  public initList = {};
  public headerList;
  public orderId;
  public pic;
  public goodsName;
  public num;
  public token;
  public isVisibleCouponOne = false;
  public timerList = [];

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
    // this.vipTypeId = urlParse(window.location.href)['vipTypeId'];
    this.orderId = urlParse(window.location.href)['orderId'];
    // this.getTime();
    // this.token = urlParse(window.location.href)['token'];
    // this.token = getToken();
    if (getToken() !== null && getToken() !== undefined && getToken() !== '') {
      this.token = getToken();
    } else if (urlParse(window.location.href)['token'] !== null && urlParse(window.location.href)['token'] !== undefined
      && urlParse(window.location.href)['token'] !== '') {
      this.token = urlParse(window.location.href)['token'];
    }
    this.getData();
  }

  getData() {
    this.appService.postFormData(this.appProperties.grouponInPayFinishUrl, {'orderId': this.orderId}, this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.initList = data.returnObject;
          // this.pic = data.returnObject.pic;
          // this.goodsName = this.initList.goodsName;
          this.num = data.returnObject.minimumGroupSize - data.returnObject.list.length;
          const headerList = data.returnObject.list;
          let headerEndList = [];
          headerList.forEach(item => {
            if (item['isSpellTheMain'] === 1) {
              headerEndList.push({
                customerId: item.customerId,
                isSpellTheMain: item.isSpellTheMain,
                headimgurl: item.headimgurl,
              });
            }
          });
          headerList.forEach(item => {
            if (item['isSpellTheMain'] === 0) {
              headerEndList.push({
                customerId: item.customerId,
                isSpellTheMain: item.isSpellTheMain,
                headimgurl: item.headimgurl,
              });
            }
          });
          if (headerEndList.length > 4) {
            this.headerList = [];
            for (let i = 0; i < 4; i++) {
              this.headerList.push(headerEndList[i]);
            }
          } else {
            this.headerList = headerEndList;
          }
        } else {
        }
      },
      error => {
        console.log(error);
      }
    );
  }

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

  goTo(val) {
    if (val === 1) {
      this.router.navigate(['cMain/grouponDetails'], {
        queryParams: {
          orderId: this.orderId
        }
      });
    } else if (val === 2) {
      this.router.navigate(['cMain/firstPage']);
    }
  }

  invite() {
    this.isVisibleCouponOne = true;
    document.getElementsByClassName('ant-modal-body')[0]['style'].cssText = 'padding: 0;';
  }

  closeCoupon() {
    this.isVisibleCouponOne = false;
  }


  // turnData(date) {
  //   const nowDate = new Date(date);
  //   const nowY = nowDate.getFullYear();
  //   const nowM = nowDate.getMonth() + 1;
  //   const nowD = nowDate.getDate();
  //   const endTime = nowY + '' + (nowM < 10 ? '0' + nowM : nowM) + '' + (nowD < 10 ? '0' + nowD : nowD);
  //   return endTime;
  // }
}
