import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  public list;
  public noPayList;
  public payList;
  public imgUrl = this.appProperties.shopImgUrl;
  public all: boolean;
  public noOrder: boolean;
  public order: boolean;
  constructor(private appService: AppService, private appProperties: AppProperties) { }

  ngOnInit() {
    this.orderList(0);
    this.all = false;
    this.noOrder = true;
    this.order = true;
  }
  sort(flag) {
    if (flag === 1) {
      this.all = false;
      this.noOrder = true;
      this.order = true;
      this.orderList(0);
    } else if (flag === 2) {
      this.all = true;
      this.noOrder = false;
      this.order = true;
      this.orderList(1);
    } else if (flag === 3) {
      this.all = true;
      this.noOrder = true;
      this.order = false;
      this.orderList(2);
    }
  }
  orderList(type) {
    this.appService.postAliData(this.appProperties.shopStoreOrderFindUrl, {findType: type} , getToken()).subscribe(
      data => {
        console.log(data);
        if (type === 0) {
          this.list = data.returnObject;
        } else if (type === 1) {
          this.noPayList = data.returnObject;
        } else if (type === 2) {
          this.payList = data.returnObject;
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  toText(state) {
    let text;
    if (state === 10001) {
      text = '已支付';
    } else if (state === 10002) {
      text = '未支付';
    }
    return text;
  }
  pay(item) {
    console.log(item);
  }
}
