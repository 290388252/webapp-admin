import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

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
    let timer = null;
    timer = setInterval(function () {
      let day = 0;
      let hour = 0;
      let minute = 0;
      let second = 0;//时间默认值
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      //

      if (day <= 9) {
        this.endDay = '0' + day;
      } else {
        this.endDay = day;
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

      console.log(this.endDay + "天:" + this.endHour + "小时：" + this.endMinute + "分钟：" + this.endSecond + "秒");
      times--;
    }, 1000);
    if (times <= 0) {
      clearInterval(timer);
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
        this.arr = [];
        // for (let i = 0; i < this.grouponList.length; i++) {
        //   const obj = this.grouponList[i];
        //   this.arr.push(obj.id);
        // }
        if(data.returnObject.length === 0) {
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
    this.appService.postFormData(this.appProperties.shoppingNewJudgeUrl, {'id': grouponId}, getToken()).subscribe(
      data => {
        // console.log(data);
        if(data.status === -99) {
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

  turnData(data) {
    const nowDate = new Date(data);
    let nowY = nowDate.getFullYear();
    let nowM = nowDate.getMonth() + 1;
    let nowD = nowDate.getDate();
    let nowHours = nowDate.getHours();
    let nowMinutes = nowDate.getMinutes();
    return data = nowY + '-' + nowM + '-' + nowD + '   ' + (nowHours < 10 ? '0' + nowHours : nowHours) + ':' + (nowMinutes < 10 ? '0' + nowMinutes : nowMinutes);
  }

  goTo() {
    if (urlParse(window.location.href)['type'] === '1') {
      this.router.navigate(['cMain/firstPage']);
    } else if (urlParse(window.location.href)['type'] === '2') {
      this.router.navigate(['cMain/allGoods']);
    }
  }
  share() {

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
    this.appService.postAliData(this.appProperties.shoppingAddUrl, {
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
