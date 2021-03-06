import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {isCombinedNodeFlagSet} from 'tslint';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './grouponShare.component.html',
  styleUrls: ['./grouponShare.component.css']
})
export class GrouponShareComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  // get
  //
  public customerSpellGroupId;
  public initList = {};
  public headerList;
  public headerLength;
  public firstName;
  public maxTimer;
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
    if (sessionStorage.getItem('customerSpellGroupId') === null
      || sessionStorage.getItem('customerSpellGroupId') === undefined
      || sessionStorage.getItem('customerSpellGroupId') === '') {
      sessionStorage.setItem('customerSpellGroupId', urlParse(window.location.href)['customerSpellGroupId']);
    }
    if (getToken() !== null && getToken() !== undefined && getToken() !== '') {
      this.token = getToken();
    } else if (urlParse(window.location.href)['token'] !== null && urlParse(window.location.href)['token'] !== undefined
      && urlParse(window.location.href)['token'] !== '') {
      this.token = urlParse(window.location.href)['token'];
    } else {
      this.token = null;
    }
    this.getData();
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取拼团订单详情
   */
  getData() {
    this.appService.postScanData(this.appProperties.grouponPayShareUrl, {'customerSpellGroupId': sessionStorage.getItem('customerSpellGroupId')}).subscribe(
      data => {
        if (data.status === 1) {
          this.initList = data.returnObject;
          this.headerLength = data.returnObject.minimumGroupSize - data.returnObject.list.length;
          const headerList = data.returnObject.list;
          let headerEndList = [];
          headerList.forEach(item => {
            if (item['isSpellTheMain'] === 1) {
              headerEndList.push({
                customerId: item.customerId,
                isSpellTheMain: item.isSpellTheMain,
                headimgurl: item.headimgurl,
                nickname: item.nickname
              });
              this.firstName = item.nickname;
            }
          });
          headerList.forEach(item => {
            if (item['isSpellTheMain'] === 0) {
              headerEndList.push({
                customerId: item.customerId,
                isSpellTheMain: item.isSpellTheMain,
                headimgurl: item.headimgurl,
                nickname: item.nickname
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
          this.maxTimer = data.returnObject.endTime;
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
   * 返回首页
   */
  goTo() {
    this.router.navigate(['cMain/firstPage']);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 参与好友拼团
   */
  invite() {
    if (this.token === undefined || this.token === '' || this.token === null) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
        'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/grouponShare?vm=1-5';
    } else {
      window.location.href = 'http://webapp.youshuidaojia.com/cMain/detail?id=' + this.initList['goodsId'] + '&shareId=' + this.initList['id'] + '&spellgroupId=' + this.initList['spellGroupId'] + '&token=' + this.token + '&invite=1&type=1';
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 判断是微信登陆还是支付宝登陆
   */
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
