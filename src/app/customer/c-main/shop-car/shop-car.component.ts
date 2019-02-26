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

  constructor(@Inject('shopCarList') private shopCarService,
              private appService: AppService,
              private appProperties: AppProperties,
              private router: Router) {
  }

  ngOnInit() {
    this.editBol = false;
    this.token = getToken();
    this.list = this.shopCarService.showGoods(this.token);
    this.showShopCarList();
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 监听增加或减少商品数量事件
   */
  changeNum(item, index) {
    if (index === -1) {
      item.num--;
      if (item.num < 1) {
        alert('最少购买一件哦！');
        item.num = 1;
      }
      this.update(item);
    } else {
      item.num++;
      this.update(item);
    }
    this.calTotalMoney();
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 添加商品到购物车
   */
  addCar(item) {
    this.appService.getAliData(this.appProperties.shoppingAddUrl, {
      itemId: item.id,
      num: 1,
      itemName: item.name
    }, this.token).subscribe(
      data => {
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 点击进入商品详情
   */
  goTo(id, name, pic) {
    this.router.navigate(['cMain/detail'], {
      queryParams: {
        id: id,
        name: name,
        pic: pic,
        // isConglomerateCommodity: isConglomerateCommodity,
        type: 1
      }
    });
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 选择购物车商品，下单
   */
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
  }

  // --------------------------------------------------------
  /**
   * 2019-02-15
   * @author maiziyao
   * 移除数组元素
   */
  remove(item) {
    const index = this.indexOf(item);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 移除数组元素
   */
  indexOf(item) {
    for (let i = 0; i <= this.data.length; i++) {
      if (this.data[i] === item) {
        return i;
      }
    }
    return -1;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 更新购物车数据
   */
  update(item) {
    this.appService.postAliData(this.appProperties.shoppingUpdateUrl, {
      id: item.id,
      itemId: item.itemId,
      num: item.num,
      itemName: item.itemName
    }, this.token).subscribe(
      data => {
        this.showShopCarList();
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取购物车list
   */
  showShopCarList() {
    this.appService.postAliData(this.appProperties.shoppingCarUrl, '', this.token).subscribe(
      data => {
        this.totalPrice = 0;
        this.data = data.returnObject;
        this.data.length <= 0 ? this.empty = true : this.empty = false;
        this.data.map(item => {
          return Object.assign(item, {checked: false});
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 转换价格 四舍五入
   */
  toFixed(num) {
    return Math.round(num * 100) / 100;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 点击全选购物车商品
   */
  checkAll() {
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 选择购物车商品
   */
  checkSingle(item) {
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

  editCar() {
    this.editBol = true;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 编辑完成
   */
  editComplete() {
    this.editBol = false;
    this.totalMoney = 0;
    this.checkAllFlag = false;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 编辑删除
   */
  editDelete() {
    this.editList = [];
    this.data.forEach(item => {
      if (item.checked) {
        this.editList.push(item.id);
      }
    });
    if (this.editList.length > 0) {
      this.appService.postAliData(this.appProperties.shopCarDelUrl, this.editList, this.token).subscribe(
        data => {
          this.showShopCarList();
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
   * 计算总价格
   */
  calTotalMoney() {
    this.totalMoney = 0;
    this.data.forEach(item => {
      if (item.checked) {
        this.totalMoney += item.price * item.num;
      }
    });
  }
}
