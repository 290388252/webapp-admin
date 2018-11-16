import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.css']
})
export class ShopCarComponent implements OnInit {
  public data = [];
  public totalPrice = 0;
  public empty: boolean;
  public list = [];
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public checkedList = [];
  public editBol: boolean;
  public checkAllFlag = false;
  public totalMoney = 0;
  public editList = [];
  public payBol = true;
  public payList = [];
  public ids: string;

  constructor( @Inject('shopCarList') private shopCarService,
               private appService: AppService,
               private appProperties: AppProperties,
               private router: Router) { }

  ngOnInit() {
    this.editBol = false;
    this.token = getToken();
    this.list = this.shopCarService.showGoods(this.token);
    this.showShopCarList();
  }
  changeNum (item, index) {
    if (index === -1) {
      item.num--;
      this.update(item);
    } else {
      item.num++;
      this.update(item);
    }
    this.calTotalMoney();
  }
  // add(item) {
  //   item.num ++;
  //   this.update(item);
  //   console.log(item);
  // }
  // delete(item) {
  //   item.num --;
  //   this.update(item);
  //   // if (item.num < 1) {
  //   //   this.totalPrice = 0;
  //   //   this.remove(item);
  //   //   this.data.forEach(items => {
  //   //     this.totalPrice += items.price * item.num;
  //   //   });
  //   //   if (this.data.length <= 0) {
  //   //     this.empty = true;
  //   //   }
  //   //   console.log(this.data);
  //   // }
  // }
  addCar(item) {
    console.log(item);
    this.appService.getAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 2) {
          window.location.href = data.returnObject;
        } else {
          alert(data.message);
          this.showShopCarList();
          this.checkAllFlag = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  goTo(id, name, pic) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        pic: pic,
        // isConglomerateCommodity: isConglomerateCommodity,
        type: 1
      }});
  }
  pay() {
    let count = 0;
    this.data.forEach(item => {
      if (item.checked) {
        this.payList.push(item.id);
        count++;
      } else {
        count = count;
      }
    });
    if (count > 0) {
      this.ids = this.payList.join(',');
      this.router.navigate(['cMain/pay'], {queryParams: {ids: this.ids}});
    } else {
      alert('请选择要结算商品');
    }
    console.log(this.ids);
  }
  // --------------------------------------------------------移除数组元素
  remove(item) {
    const index = this.indexOf(item);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }
  indexOf(item) {
    for (let i = 0; i <= this.data.length; i++) {
      if (this.data[i] === item) {
        return i;
      }
    }
    return -1;
  }
  // --------------------------------------------------------移除数组元素
  update(item) {
    this.appService.postAliData(this.appProperties.shoppingUpdateUrl, {
      id: item.id,
      itemId: item.itemId,
      num: item.num,
      itemName: item.itemName
    }, this.token).subscribe(
      data => {
        console.log(data);
        this.showShopCarList();
      },
      error => {
        console.log(error);
      }
    );
  }
  showShopCarList() {
    this.appService.postAliData(this.appProperties.shoppingCarUrl, '', this.token).subscribe(
      data => {
        console.log(data);
        this.totalPrice = 0;
        this.data = data.returnObject;
        // this.data.forEach(item => {
        //   item.pic = item.pic.split(',')[0];
        //   this.totalPrice += item.price * item.num;
        // });
        this.data.length <= 0 ? this.empty = true : this.empty = false;
        this.data.map(item => {
          return Object.assign(item, {checked: false});
        });
        console.log(this.data);
        // console.log(this.totalPrice);
      },
      error => {
        console.log(error);
      }
    );
  }
  toFixed(num) {
    return Math.round(num * 100) / 100;
  }

  // 全选
  // checkAll () {
  //   const all = document.getElementById('allCheck');
  //   const singles = document.getElementsByClassName('singleCheck');
  //   if (all['checked']) {
  //     for (let i = 0; i < singles.length; i++) {
  //       const single = singles[i];
  //       single['checked'] = true;
  //     }
  //     this.data.forEach(item => {
  //       this.checkedList.push(item);
  //     });
  //   }
  //   for (let i = 0; i < singles.length; i++) {
  //     if (!all['checked']) {
  //       const single = singles[i];
  //       single['checked'] = false;
  //       this.checkedList = [];
  //     }
  //   }
  //   console.log(Array.from(new Set(this.checkedList)));
  // }

  checkAll () {
    this.checkAllFlag = !this.checkAllFlag;
    if (this.checkAllFlag) {
      this.data.forEach(item => {
        item.checked = true;
      });
    } else {
      this.data.forEach(item => {
        item.checked = false;
      });
    }
    this.calTotalMoney();
  }

  // 单选
  // checkSingle (item) {
  //   // console.log(item);
  //   const all = document.getElementById('allCheck');
  //   const singles = document.getElementsByClassName('singleCheck');
  //   let count = 0;
  //   for (let i = 0; i < singles.length; i++) {
  //     const single = singles[i];
  //     if (single['checked']) {
  //       count++;
  //     } else {
  //       count = count;
  //     }
  //   }
  //   if (count === singles.length) {
  //     all['checked'] = true;
  //   } else {
  //     all['checked'] = false;
  //   }
  // }

  checkSingle (item) {
    item.checked = !item.checked;
    let count = 0;
    this.data.forEach(val => {
      if (val.checked) {
        count++;
      } else {
        count = count;
      }
    });
    if (count === this.data.length) {
      this.checkAllFlag = true;
    } else {
      this.checkAllFlag = false;
    }
    this.calTotalMoney();
  }

  // 点击编辑
  editCar () {
    this.editBol = true;
  }
  // 编辑完成
  editComplete() {
    this.editBol = false;
    this.totalMoney = 0;
    this.checkAllFlag = false;
    // if (this.editList.length > 0) {
    //   this.appService.postAliData(this.appProperties.shopCarSaveUrl, this.editList, this.token).subscribe(
    //     data => {
    //       console.log(data);
    //       this.showShopCarList();
    //       this.calTotalMoney();
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // }
  }

  // 编辑删除
  editDelete() {
    this.editList = [];
    this.data.forEach(item => {
      // console.log(item);
      if (item.checked) {
        // console.log(item);
        // const index = this.data.indexOf(item);
        // this.data.splice(index, 1);
        this.editList.push(item.id);
      }
      // else {
      //   // this.editList.push({id: item.id, itemId: item.itemId, num: item.num});
      //   console.log('editlist');
      //   // console.log(this.editList);
      // }
    });
    console.log(this.editList);
    if (this.editList.length > 0) {
      this.appService.postAliData(this.appProperties.shopCarDelUrl, this.editList, this.token).subscribe(
        data => {
          console.log(data);
          this.showShopCarList();
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  // 计算总价格
  calTotalMoney () {
    this.totalMoney = 0;
    this.data.forEach(item => {
      if (item.checked) {
        this.totalMoney += item.price * item.num;
      }
    });
  }
}
