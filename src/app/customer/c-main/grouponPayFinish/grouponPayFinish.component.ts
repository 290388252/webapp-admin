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
  templateUrl: './grouponPayFinish.component.html',
  styleUrls: ['./grouponPayFinish.component.css']
})
export class GrouponPayFinishComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  // get
  //
  public initList;
  public headerList;
  public orderId;
  public maxTimer;
  public goodsName;
  public shareId;
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
    this.token = getToken();
    this.share();
    this.getData();
  }

  getData() {
    this.appService.postFormData(this.appProperties.grouponPayFinishUrl, {'orderId': this.orderId}, this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.initList = data.returnObject;
          this.goodsName = this.initList.goodsName;
          this.shareId = this.initList.id;
          this.maxTimer = this.initList.endTime;
          this.num = this.initList.minimumGroupSize - this.initList.list.length;
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
          const maxTimer = (new Date(this.maxTimer.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
          this.countDown(maxTimer, function (msg) {
            document.getElementById('timer').innerHTML = msg;
          });
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
      this.router.navigate(['cMain/firstPage']);
    } else if (val === 2) {
      this.router.navigate(['cMain/grouponDetails'], {
        queryParams: {
          orderId: this.orderId
        }
      });
    }

  }

  invite() {
    this.isVisibleCouponOne = true;
    document.getElementsByClassName('ant-modal-body')[0]['style'].cssText = 'padding: 0;';
  }

  closeCoupon() {
    this.isVisibleCouponOne = false;
  }

  share() {
    // {url: `http://webapp.youshuidaojia.com/cMain/bargainDetails?id=${this.bargainId}&addressId=${this.addressId}&bargainMoney=${this.bargainMoney}&bargainShow=1`},
    this.appService.postFormData(this.appProperties.wechatShareInfoUrl,
      {url: window.location.href},
      this.token).subscribe(
      data => {
        wx.config({
          debug: false,
          appId: data.data.appId,
          timestamp: data.data.timestamp,
          nonceStr: data.data.nonceStr,
          signature: data.data.signature,
          jsApiList: ['checkJsApi',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
          ]
        });
        wx.ready(function () {
          const shareData = {
            title: '仅剩' + this.num + '个名额了',
            desc: '优水到家:' + this.initList['goodsName'], // 这里请特别注意是要去除html
            // http://192.168.0.106:9527/cMain/grouponShare?customerSpellGroupId=24
            // link: 'http://webapp.youshuidaojia.com/cMain/grouponShare?customerSpellGroupId=' + urlParse(window.location.href)['customerSpellGroupId'],
            link: 'http://webapp.youshuidaojia.com/cMain/grouponShare?customerSpellGroupId=' + this.shareId,
            imgUrl: this.imgUrl + this.initList['pic'],
            // imgUrl: '../../../assets/main/logo.png',
            success: function () {
              // 用户确认分享后执行的回调函数
              console.log('success');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              console.log('cancel');
            }
          };
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareQQ(shareData);
          wx.onMenuShareWeibo(shareData);
        });
        wx.error(function (res) {
          console.log(res);
        });
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  // 判断是微信登陆还是支付宝登陆
  urlParse(url): object {
    const obj = {};
    const reg = /[?&][^?&]+=[^?&]+/g;
    const arr = url.match(reg);
    if (arr) {
      arr.forEach(function (item) {
        const tempArr = item.substring(1).split('=');
        const key = decodeURIComponent(tempArr[0]);
        const val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      });
    }
    return obj;
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
