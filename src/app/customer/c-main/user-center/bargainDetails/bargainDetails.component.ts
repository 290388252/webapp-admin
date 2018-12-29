import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './bargainDetails.component.html',
  styleUrls: ['./bargainDetails.component.css']
})
export class BargainDetailsComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public orderId;
  public isFocusA;
  public isFocusB;
  public endTime: string;
  public goodsId: number;
  public id: number;
  public list = [];
  public lowestPrice: number;
  public allNumber;
  public name: string;
  public pic: string;
  public price: number;
  public purchaseNumber: number;
  public state;
  public stateLabel;
  public surplusPrice: number;
  public time: number;
  public timerList = [];
  public isVisibleCouponOne = false;
  public isVisibleCouponTwo = false;
  public bargainMoney;
  public bargainShow;
  public bargainId;
  public addressId;

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
    // this.userBalance = urlParse(window.location.href)['userBalance'];
    this.token = getToken();
    this.bargainShow = urlParse(window.location.href)['bargainShow'];
    this.bargainId = urlParse(window.location.href)['id'];
    this.addressId = urlParse(window.location.href)['addressId'];
    // this.token = urlParse(window.location.href)['token'];
    this.share();
    this.appService.postAliData(this.appProperties.bargainSponsoBargainDetailsUrl
      + `?id=${urlParse(window.location.href)['id']}`, '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.endTime = data.returnObject.endTime;
          this.goodsId = data.returnObject.goodsId;
          this.id = data.returnObject.id;
          this.list = data.returnObject.list;
          this.lowestPrice = data.returnObject.lowestPrice;
          this.pic = this.imgUrl + data.returnObject.pic;
          this.name = data.returnObject.name;
          this.price = data.returnObject.price;
          this.purchaseNumber = data.returnObject.purchaseNumber;
          this.state = data.returnObject.state;
          this.surplusPrice = data.returnObject.surplusPrice;
          this.time = data.returnObject.time;
          this.allNumber = data.returnObject.allNumber;
          const endTime = (new Date(data.returnObject.endTime.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
          this.countDown(endTime, function (msg) {
            document.getElementById('timer').innerHTML = msg;
          });
        }
      },
      error => {
        console.log(error);
      }
    );
    if (this.bargainShow === '1') {
      this.isVisibleCouponTwo = true;
      this.bargainMoney = urlParse(window.location.href)['bargainMoney'];
    }
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

  goTo() {
    this.router.navigate(['cMain/bargainList'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }

  to() {
    this.isVisibleCouponOne = true;
    document.getElementsByClassName('ant-modal-body')[0]['style'].cssText = 'padding: 0;';
  }

  closeCoupon() {
    this.isVisibleCouponOne = false;
  }

  shareFriends() {
    this.isVisibleCouponTwo = false;
    this.isVisibleCouponOne = true;
    document.getElementsByClassName('ant-modal-body')[0]['style'].cssText = 'padding: 0;';
  }

  share() {
    // {url: `http://webapp.youshuidaojia.com/cMain/bargainDetails?id=${this.bargainId}&addressId=${this.addressId}&bargainMoney=${this.bargainMoney}&bargainShow=1`},
    this.appService.postFormData(this.appProperties.wechatShareInfoUrl,
      {url: window.location.href },
      this.token).subscribe(
      data => {
        console.log(data);
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
        // const link = 'http://webapp.youshuidaojia.com/cMain/bargainDetailsShare?customerBargainId=' + this.bargainId;
        // + '&?token=' + this.token;
        // console.log(link);
        wx.ready(function () {
          const shareData = {
            title: '优水到家',
            desc: '麻烦帮我砍下价可以么?', // 这里请特别注意是要去除html
            link: 'http://webapp.youshuidaojia.com/cMain/bargainDetailsShare?customerBargainId=' + urlParse(window.location.href)['id'],
            imgUrl: 'http://119.23.233.123:6662/ys_admin/companyLogo/20181008_142714.png',
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

}
