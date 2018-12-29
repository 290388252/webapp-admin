import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

declare var WeixinJSBridge: any;
declare var wx: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  // array = [
  //   '../../../../assets/main/raw_1529043263.png',
  //   '../../../../assets/main/raw_1529043326.png',
  //   '../../../../assets/main/raw_1529043367.png',
  //   '../../../../assets/main/raw_1529043422.png'
  // ];
  public id;
  public name;
  // 判断是否为团购商品
  public goodsObj = {};
  public imgUrl = this.appProperties.shopImgUrl;
  public imgList = [];
  public token;
  public curId: number;
  public pic;
  //
  public endDay;
  public endHour;
  public endMinute;
  public endSecond;
  public quantity;
  public typeId;
  //
  public grouponList;
  public grouponNumber;
  public grouponTotal;
  public grouponId;
  public arr;
  public isVisible;
  public isVisibleA;
  public quantityFalse;
  public listShow;
  public timerList = [];
  public activityId;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
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
    this.id = urlParse(window.location.href)['id'];
    // this.name = urlParse(window.location.href)['name'];
    this.pic = urlParse(window.location.href)['pic'];
    this.showGoods();
    this.curId = 1;
    this.isVisible = false;
    // this.countDown(325);
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
        const msg = endHour + ':' + endMinutes + ':' + endSeconds;
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

  showGoods() {
    this.appService.postAliData(this.appProperties.shoppingGoodsDetailUrl, {id: this.id}, '').subscribe(
      data => {
        console.log(data);
        this.imgList = data.returnObject.pic.split(',');
        console.log('123');
        console.log(this.imgList);
        this.goodsObj = data.returnObject;
        this.activityId = data.returnObject.goodsBargainId;
        this.name = data.returnObject.name;
        this.typeId = data.returnObject.typeId;
        const a = document.getElementById('desk');
        a.innerHTML = this.goodsObj['details'];
        const b = document.getElementById('desks');
        b.innerHTML = this.goodsObj['commodityParameters'];
        const c = document.getElementById('deskss');
        c.innerHTML = this.goodsObj['purchaseNotes'];
        this.grouponNumber = data.returnObject.num;
      },
      error => {
        console.log(error);
      }
    );
    this.appService.postAliData(this.appProperties.shoppingGrouponMemberQuantity, {shoppingGoodsId: this.id}, '').subscribe(
      data => {
        console.log(data);
        this.grouponList = data.returnObject;
        this.grouponTotal = data.returnObject.length;
        // this.countDown(this.grouponList[0].endTime);
        console.log(this.grouponList.length > 0);
        if (this.grouponList.length > 0) {
          for (let i = 0; i < this.grouponList.length; i++) {
            console.log(new Date(this.grouponList[i].endTime.replace(/-/g, '/')).getTime());
            const endTime = (new Date(this.grouponList[i].endTime.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
            this.countDown(endTime, function (msg) {
              document.getElementById('timer' + i).innerHTML = msg;
            });
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  verifyTime(time) {
    // console.log(time);
    const value = (new Date(time.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
    if (value > 0) {
      return false;
    } else {
      return true;
    }
  }

  /*showModal(list): void {
    this.isVisible = true;
    console.log(list);
    if (list.length > 0) {
      console.log('2');
      console.log(list);
      for (let i = 0; i < list.length; i++) {
        const endTime = (new Date(list[i].endTime.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
        this.countDown(endTime, function (msg) {
          document.getElementById(('a' + list[i].id)).innerHTML = msg;
        });
      }
    }
  }*/

  handleCancel(): void {
    this.isVisible = false;
  }

  showQuantity(grouponId): void {
    if (getToken() === null || getToken() === undefined) {
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&' +
      //   'redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&' +
      //   'scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';

    } else {
      if (grouponId !== null) {
        this.appService.postFormData(this.appProperties.shoppingNewJudgeUrl, {'id': grouponId}, getToken()).subscribe(
          data => {
            // console.log(data);
            if (data.status === -99) {
              alert(data.message);
              return;
            } else {
              this.grouponId = grouponId;
              this.isVisible = false;
              this.isVisibleA = true;
              this.quantity = 1;
              this.quantityFalse = false;
            }
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.grouponId = grouponId;
        this.isVisible = false;
        this.isVisibleA = true;
        this.quantity = 1;
        this.quantityFalse = false;
      }
    }

  }

  quantityCancel(): void {
    this.isVisibleA = false;
  }

  selected(flag) {
    this.curId = flag;
  }

  turnPhone(phone) {
    if (phone) {
      return phone = phone.substr(0, 3) + '*****' + phone.substr(8);
    }
  }

  turnData(date) {
    const nowDate = new Date(date.replace(/-/g, '/'));
    // console.log(nowDate);
    const nowY = nowDate.getFullYear();
    const nowM = nowDate.getMonth() + 1;
    const nowD = nowDate.getDate();
    const nowHours = nowDate.getHours();
    const nowMinutes = nowDate.getMinutes();
    const endTime = nowY + '-' + nowM + '-' + nowD + '   ' + (nowHours < 10 ? '0' + nowHours : nowHours) + ':' + (nowMinutes < 10 ? '0' + nowMinutes : nowMinutes);
    return endTime;
  }

  goTo() {
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else {
      if (urlParse(window.location.href)['type'] === '1') {
        this.router.navigate(['cMain/firstPage']);
      } else if (urlParse(window.location.href)['type'] === '2') {
        this.router.navigate(['cMain/allGoods']);
      }
    }
  }

  share(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    const m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText =
      'width: 60%;' +
      'min-width: 150px;' +
      'opacity: 0.7;' +
      'height: 30px;' +
      'color: rgb(255, 255, 255);' +
      'line-height: 30px;' +
      'text-align: center;' +
      'border-radius: 5px;' +
      'position: fixed;top: 40%;' +
      'left: 20%;z-index: 999999;' +
      'background: rgb(0, 0, 0);' +
      'font-size: 12px;';
    document.body.appendChild(m);
    setTimeout(function () {
      const d = 0.5;
      m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
      m.style.opacity = '0';
      setTimeout(function () {
        document.body.removeChild(m);
      }, d * 1000);
    }, duration);
    this.appService.postAliData(this.appProperties.wechatShareInfoUrl +
      '?url=http://webapp.youshuidaojia.com/cMain/detail?id=' +
      this.id +
      '&name=' +
      this.name +
      '&pic=' +
      this.pic +
      '&type=1',
      '', this.token).subscribe(
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
        const link = 'http://webapp.youshuidaojia.com/cMain/detail?id=' +
          this.id +
          '&name=' +
          this.name +
          '&pic=' +
          this.pic +
          '&type=1';
        console.log(link);
        wx.ready(function () {
          console.log(123);
          const shareData = {
            title: '优水到家',
            desc: '来拼单', // 这里请特别注意是要去除html
            link: link,
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

  grouponGo(quantity, id, grouponId) {
    if (quantity === null || quantity === undefined || quantity === '') {
      this.quantityFalse = true;
      return;
    }
    this.isVisibleA = false;
    this.router.navigate(['cMain/grouponPay'], {
      queryParams: {
        quantity: quantity,
        id: id,
        groupId: grouponId,
      }
    });

  }

  btnCartAndBuy() {
    // alert(getToken());
    // alert(urlParse(window.location.href)['token']);
    // if (getToken() === null || getToken() === undefined || getToken() === '')
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
      document.cookie = 'shopToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    }
    if (getToken() === null || getToken() === undefined) {
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&' +
      //   'redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&' +
      //   'state=/cMain/firstPage?vm=1-1';
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';

      // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1;

    } else {
      this.appService.postAliData(this.appProperties.detailCartAndBuyUrl, {
        itemId: this.id,
        num: 1,
        itemName: this.name
      }, getToken()).subscribe(
        data => {
          if (data.status === 1) {
            this.router.navigate(['cMain/pay'], {queryParams: {ids: data.returnObject.id, payType: 1}});
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  create(activityId) {
    this.appService.postFormData(this.appProperties.bargainJudgeJoinedUrl, {id: activityId}, getToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.router.navigate(['cMain/newAddress'], {
            queryParams: {
              type: 4,
              activityId: activityId,
              select: 1
            }
          });
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
  orderTo(val) {
    if (getToken() === null || getToken() === undefined || getToken() === '') {
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&' +
      //   'redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&' +
      //   'state=/cMain/firstPage?vm=1-1';
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';

    } else {
      this.appService.getAliData(this.appProperties.shoppingAddUrl, {
        itemId: this.id,
        num: 1,
        itemName: this.name
      }, getToken()).subscribe(
        data => {
          console.log(data);
          alert(data.message);
          if (data.status === 1 && val === 1) {
            this.router.navigate(['cMain/shopCar']);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  turnToPage(val) {
    if (val === 1) {
      this.router.navigate(['cMain/firstPage']);
    }
    if (val === 2) {
      this.router.navigate(['cMain/allGoods'], {
        queryParams: {
          value: 0,
        }
      });
    }
    if (val === 3) {
      this.router.navigate(['cMain/shopCar']);
    }
  }
}
