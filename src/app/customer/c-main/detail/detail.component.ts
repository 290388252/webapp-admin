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
  public mealId;
  public mealList;
  public mealListId;
  public imgPath = this.appProperties.appUrl + '/shoppingGoodsImg/';
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
  public maxNum = 3;
  public quantityMaxFalse;
  //
  public grouponList;
  public grouponNumber;
  public grouponTotal;
  public grouponId;
  public arr;
  public isVisible;
  public isVisibleA;
  public isVisibleB;
  public isVisibleC;
  public quantityFalse;
  public listShow;
  public timerList = [];
  public activityId;
  public goodsBargainId;
  public spellgroupId;
  public invite;
  public shareId;

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
    this.spellgroupId = urlParse(window.location.href)['spellgroupId'];
    this.invite = urlParse(window.location.href)['invite'];
    this.shareId = urlParse(window.location.href)['shareId'];
    this.showGoods();
    this.curId = 1;
    this.isVisible = false;
    this.isVisibleB = false;
    this.isVisibleC = false;
    window.onload = function () {
      document.getElementsByClassName('ant-modal-close-x')[1]['style'].cssText = 'display: none;';
    };
    if (getToken() !== null && getToken() !== undefined && getToken() !== '') {
      this.token = getToken();
    } else if (urlParse(window.location.href)['token'] !== null && urlParse(window.location.href)['token'] !== undefined
      && urlParse(window.location.href)['token'] !== '') {
      this.token = urlParse(window.location.href)['token'];
    } else {
      this.token = null;
    }
    /**
     * 2019-02-14
     * @author maiziyao
     * invite=1为参与他人拼团
     */
    if (this.invite === '1' || this.invite === 1) {
      this.showQuantity(this.shareId);
    } else {
      this.invite = 0;
    }
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 拼团倒计时
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
        const msg = '剩余' + endHour + ':' + endMinutes + ':' + endSeconds;
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
   * 2019-02-14
   * @author maiziyao
   * 商品详情
   */
  showGoods() {
    this.appService.postAliData(this.appProperties.shoppingGoodsDetailUrl, {
      id: this.id,
      spellgroupId: this.spellgroupId
    }, '').subscribe(
      data => {
        this.maxNum = data.returnObject.numberLimit;
        this.pic = data.returnObject.pic;
        this.imgList = data.returnObject.pic.split(',');
        this.goodsObj = data.returnObject;
        this.activityId = data.returnObject.activityId;
        this.goodsBargainId = data.returnObject.goodsBargainId;
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
    this.appService.postAliData(this.appProperties.shoppingGrouponMemberQuantity, {spellgroupId: this.spellgroupId}, '').subscribe(
      data => {
        this.grouponList = data.returnObject;
        this.grouponTotal = data.returnObject.length;

        // this.countDown(this.grouponList[0].endTime);
        if (this.grouponList.length > 0) {
          for (let i = 0; i < this.grouponList.length; i++) {
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

  /**
   * 2019-02-14
   * @author maiziyao
   * 时间转换 兼容ios
   */
  verifyTime(time) {
    const value = (new Date(time.replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000;
    if (value > 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 拼团输入商品数量
   */
  showQuantity(grouponId): void {
    if (grouponId !== null) {
      this.invite = 1;
    }
    if (this.token === null || this.token === undefined || this.token === null) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-6';
    } else {
      if (grouponId !== null) {
        // 参与他人拼团
        this.appService.postFormData(this.appProperties.shoppingNewJudgeUrl, {'id': grouponId}, this.token).subscribe(
          data => {
            if (data.status === -99) {
              alert(data.message);
              return;
            } else {
              this.grouponId = grouponId;
              this.isVisible = false;
              this.isVisibleA = true;
              this.quantity = 1;
              this.quantityMaxFalse = false;
              this.quantityFalse = false;
            }
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.appService.postFormData(this.appProperties.shoppingGrouponJudegUrl, {'spellGroupId': this.spellgroupId}, this.token).subscribe(
          data => {
            if (data.status === -99) {
              this.isVisibleB = true;
              document.getElementById('message').innerHTML = data.message;
              return;
            } else if (data.status === 1) {
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
      }
    }

  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 拼团友情提示弹框
   */
  cancelB(): void {
    this.isVisibleB = false;
  }
  cancelC(): void {
    this.isVisibleC = false;
  }
  /**
   * 2019-02-14
   * @author maiziyao
   * 关闭拼团数量输入弹框
   */
  quantityCancel(): void {
    this.isVisibleA = false;
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 选择tab（图文详情、商品参数、购买须知）
   */
  selected(flag) {
    this.curId = flag;
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 转换拼团用户手机号码
   */
  turnPhone(phone) {
    if (phone) {
      return phone = phone.substr(0, 3) + '*****' + phone.substr(8);
    }
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 转换时间格式
   */
  turnData(date) {
    const nowDate = new Date(date.replace(/-/g, '/'));
    const nowY = nowDate.getFullYear();
    const nowM = nowDate.getMonth() + 1;
    const nowD = nowDate.getDate();
    const nowHours = nowDate.getHours();
    const nowMinutes = nowDate.getMinutes();
    const endTime = nowY + '-' + nowM + '-' + nowD + '   ' + (nowHours < 10 ? '0' + nowHours : nowHours) + ':' + (nowMinutes < 10 ? '0' + nowMinutes : nowMinutes);
    return endTime;
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 页面跳转
   */
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

  /**
   * 2019-02-14
   * @author maiziyao
   * 商品分享
   */
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
        wx.ready(function () {
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

  /**
   * 2019-02-14
   * @author maiziyao
   * 增加拼团商品购买的数量
   */
  offNum() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    } else {
      this.quantity = 1;
      this.quantityFalse = true;
      setTimeout(() => {
        this.quantityFalse = false;
      }, 3000);
    }
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 减少拼团商品购买的数量
   */
  addNum() {
    if (this.quantity === this.maxNum) {
      this.quantity = this.maxNum;
      this.quantityMaxFalse = true;
      setTimeout(() => {
        this.quantityMaxFalse = false;
      }, 3000);
    } else {
      this.quantity = this.quantity + 1;
    }
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 确认提交拼团数量
   */
  grouponGo(quantity, id, grouponId, spellgroupId) {
    if (quantity === null || quantity === undefined || quantity === '') {
      this.quantityFalse = true;
      setTimeout(() => {
        this.quantityFalse = false;
      }, 3000);
      return;
    }
    this.isVisibleA = false;
    this.router.navigate(['cMain/grouponPay'], {
      queryParams: {
        quantity: quantity,
        id: id,
        groupId: grouponId,
        spellgroupId: spellgroupId,
        invite: this.invite,
        token: this.token
      }
    });
  }

  /**
   * 2019-02-14
   * @author maiziyao
   * 普通商品立即购买
   */
  btnCartAndBuy() {
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
      document.cookie = 'shopToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    }
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else {
      this.appService.postAliData(this.appProperties.detailCartAndBuyUrl, {
        itemId: this.id,
        num: 1,
        itemName: this.name,
        mealId: this.mealId
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
  chooseId() {
    this.isVisibleC = true;
    console.log(1);
    this.appService.postAliData(this.appProperties.mealListUrl, {goodsId: 67}, getToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.mealList = data.returnObject;
          if (data.returnObject !== null) {
            this.mealListId = data.returnObject.length;
          } else {
            this.mealListId = 0
          }
        } else if (data.status === -1) {
          this.router.navigate(['systemAdminLogin']);
        }
      },
      error => {
        console.log(error);
      });
  }
  selectThis(item) {
    this.isVisibleC = false;
    this.imgList = [];
    this.imgList.push(item.pic);
    this.mealId = item.id;
  }
  /**
   * 2019-02-14
   * @author maiziyao
   * 砍价免费拿
   */
  create(activityId) {
    this.appService.postFormData(this.appProperties.bargainJudgeJoinedUrl, {id: activityId}, getToken()).subscribe(
      data => {
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

  /**
   * 2019-02-14
   * @author maiziyao
   * 团购商品正价购买
   */
  orderTo(val) {
    if (getToken() === null || getToken() === undefined || getToken() === '') {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else {
      this.appService.getAliData(this.appProperties.shoppingAddUrl, {
        itemId: this.id,
        num: 1,
        itemName: this.name
      }, getToken()).subscribe(
        data => {
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

  /**
   * 2019-02-14
   * @author maiziyao
   * 页面跳转
   */
  turnToPage(val) {
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else {
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
}
