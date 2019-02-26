import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './bargainDetailsShare.component.html',
  styleUrls: ['./bargainDetailsShare.component.css']
})
export class BargainDetailsShareComponent implements OnInit, OnDestroy {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public orderId;
  public isFocusA;
  public isFocusB;
  public pic: string;
  public endTime: number;

  public itemId;
  public itemName;
  public currPrice;
  public lowestPrice;
  public bargainInfoObj;
  public buyNum;
  public salesPrice;
  public bargainMoney;
  public timerList = [];
  public bargainModal = false;

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
    if (urlParse(window.location.href)['token'] === undefined) {
      this.token = 'null';
    } else {
      this.token = urlParse(window.location.href)['token'];
    }
    // this.token = getToken();
    if (sessionStorage.getItem('customerBargainId') === null
      || sessionStorage.getItem('customerBargainId') === undefined
      || sessionStorage.getItem('customerBargainId') === '') {
      sessionStorage.setItem('customerBargainId', urlParse(window.location.href)['customerBargainId']);
    }
    this.appService.postAliData(this.appProperties.bargainGetBargainInfoUrl
      + sessionStorage.getItem('customerBargainId'), '', this.token).subscribe(
      data => {
        if (data.status === 6004 || data.status === 1) {
          sessionStorage.setItem('goodsBargainId', data.returnObject.goodsBargainId);
          this.itemId = data.returnObject.goodsBargainId;
          this.itemName = data.returnObject.itemName;
          this.currPrice = data.returnObject.currPrice;
          this.lowestPrice = data.returnObject.lowestPrice;
          this.buyNum = data.returnObject.buyNum;
          this.salesPrice = data.returnObject.salesPrice;
          this.pic = this.imgUrl + data.returnObject.pic;
          this.endTime = data.returnObject.endTime;
          this.countTime(this.endTime, function (msg) {
            document.getElementById('timer').innerHTML = msg;
          });
        } else if (data.status === -1) {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
            'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/bargainDetailsShare?vm=1-4';
        } else {
          this.bargainInfoObj = '';
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
   * 跳转到砍价列表
   */
  goTo() {
    this.router.navigate(['cMain/bargainList'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 帮朋友砍一刀
   */
  to() {
    if (this.token === undefined || this.token === '') {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
        'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/bargainDetailsShare?vm=1-4';
    } else {
      this.appService.postAliData(this.appProperties.bargainDoUrl
        + sessionStorage.getItem('customerBargainId'), '', this.token).subscribe(
        data => {
          if (data.status === 1) {
            this.bargainModal = true;
            this.bargainMoney = data.returnObject;
          } else if (data.status === -1) {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
              'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/bargainDetailsShare?vm=1-4';
          } else {
            alert('砍价失败');
          }
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
   * 关闭成功砍价弹框
   */
  closeModal() {
    this.bargainModal = false;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 倒计时
   */
  countTime(endTime, fn) {
      const timer = setInterval( () => {
      if (endTime >= 0) {
        const time = endTime - new Date().getTime();
        const day = Math.floor(time / 1000 / 60 / 60 / 24);
        const hours = Math.floor(time / 1000 / 60 / 60 % 24);
        const minutes = Math.floor(time / 1000 / 60 % 60);
        const seconds = Math.floor(time / 1000 % 60);
        const msg = `${day}天${hours}小时${minutes}分${seconds}秒后结束`;
        fn(msg);
        --endTime;
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
   * 点击免费拿
   */
  toCreate(activityId) {
    let id;
    if (activityId === null || activityId === undefined || activityId === '') {
      id = sessionStorage.getItem('goodsBargainId');
    } else {
      id = activityId;
    }
    this.appService.postFormData(this.appProperties.bargainJudgeJoinedUrl, {id: id}, this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.router.navigate(['cMain/newAddress'], {
            queryParams: {
              type: 4,
              activityId: activityId,
              select: 1
            }
          });
        } else if (data.status === -1) {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
            'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/bargainDetailsShare?vm=1-1';
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
   * 点击免费拿
   */
  toFixed(num) {
    return Math.round(num * 100) / 100;
  }
}
