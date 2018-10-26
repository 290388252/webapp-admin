import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {toNumber} from "ng-zorro-antd/src/core/util/convert";

declare var WeixinJSBridge: any;
declare var wx: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  array = [
    '../../../../assets/main/raw_1529043263.png',
    '../../../../assets/main/raw_1529043326.png',
    '../../../../assets/main/raw_1529043367.png',
    '../../../../assets/main/raw_1529043422.png'
  ];
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

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
  }


  ngOnInit() {
    this.id = urlParse(window.location.href)['id'];
    this.name = urlParse(window.location.href)['name'];
    this.pic = urlParse(window.location.href)['pic'];
    this.showGoods();
    this.isVisible = false;
    // this.countDown(325);
    this.curId = 1;


  }

  countDown(times) {
    let endTime = (new Date(times).getTime() - new Date().getTime()) / 1000;
    let timer = null;
    timer = setInterval(function () {
      let hour = 0;
      let minute = 0;
      let second = 0;//时间默认值
      if (endTime > 0) {
        hour = Math.floor(endTime / (60 * 60));
        minute = Math.floor(endTime / 60) - (hour * 60);
        second = Math.floor(endTime) - (hour * 60 * 60) - (minute * 60);
      }
      if (hour <= 9) {
        this.endHour = '0' + hour;
      } else {
        this.endHour = hour;
      }
      if (minute <= 9) {
        this.endMinute = '0' + minute;
      } else {
        this.endMinute = minute;
      }
      if (second <= 9) {
        this.endSecond = '0' + second;
      } else {
        this.endSecond = second;
      }
      // console.log(this.endHour + "小时：" + this.endMinute + "分钟：" + this.endSecond + "秒");
      document.getElementById('abc').innerHTML = this.endHour + ":" + this.endMinute + ":" + this.endSecond;
      endTime--;
    }, 1000);
    if (endTime <= 0) {
      clearInterval(timer);
      // document.getElementById('abc').innerHTML=this.endHour + ":" + this.endMinute + ":" + this.endSecond;
    }
  }


  showGoods() {
    this.appService.postAliData(this.appProperties.shoppingGoodsDetailUrl, {id: this.id}, '').subscribe(
      data => {
        console.log(data);
        this.imgList = data.returnObject.pic.split(',');
        this.goodsObj = data.returnObject;
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
        // this.countDown(this.grouponList[0].endTime);
        this.arr = [];
        // for (let i = 0; i < this.grouponList.length; i++) {
        //   const obj = this.grouponList[i];
        //   this.arr.push(obj.id);
        // }
        if (data.returnObject.length === 0) {
          this.grouponTotal = 0;
          this.listShow = false;
        } else {
          this.grouponNumber = data.returnObject[0].totalStaff;
          this.grouponTotal = data.returnObject.length;
          this.listShow = true;
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showQuantity(grouponId): void {
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://ym//://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1';
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
    return phone = phone.substr(0, 3) + "*****" + phone.substr(8);
  }

  turnData(date) {
    const nowDate = new Date(date.replace(/-/g, '/'));
    // console.log(nowDate);
    let nowY = nowDate.getFullYear();
    let nowM = nowDate.getMonth() + 1;
    let nowD = nowDate.getDate();
    let nowHours = nowDate.getHours();
    let nowMinutes = nowDate.getMinutes();
    // return new Date(date.replace(/-/g,'/')).getFullYear() + '-' + (new Date(date.replace(/-/g,'/')).getMonth() + 1) + '-' + new Date(date.replace(/-/g,'/')).getDate();
    const endTime = nowY + '-' + nowM + '-' + nowD + '   ' + (nowHours < 10 ? '0' + nowHours : nowHours) + ':' + (nowMinutes < 10 ? '0' + nowMinutes : nowMinutes);
    return endTime;
  }

  goTo() {
    if (urlParse(window.location.href)['type'] === '1') {
      this.router.navigate(['cMain/firstPage']);
    } else if (urlParse(window.location.href)['type'] === '2') {
      this.router.navigate(['cMain/allGoods']);
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

  grouponGo(quantity, id, name, money, grouponId, pic) {
    if (quantity === null || quantity === undefined || quantity === '') {
      this.quantityFalse = true;
      return;
    }
    this.isVisibleA = false;
    this.router.navigate(['cMain/grouponPay'], {
      queryParams: {
        quantity: quantity,
        id: id,
        name: name,
        money: money,
        grouponId: grouponId,
        pic: pic
      }
    });

  }

  orderTo() {
    if (getToken() === null || getToken() === undefined) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=http://ym//://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1';
    } else {
      this.appService.getAliData(this.appProperties.shoppingAddUrl, {
        itemId: this.id,
        num: 1,
        itemName: this.name
      }, getToken()).subscribe(
        data => {
          console.log(data);
          alert(data.message);
          if (data.status === 1) {
            this.router.navigate(['cMain/shopCar']);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
