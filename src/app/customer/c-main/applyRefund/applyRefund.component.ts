import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './applyRefund.component.html',
  styleUrls: ['./applyRefund.component.css']
})
export class ApplyRefundComponent implements OnInit {
  public orderItemList;
  public payCode;
  public orderType;
  public refundPrice;
  public totalPrice;
  public refundReason;
  public flag;
  public imgUrl = this.appProperties.shopImgUrl;
  public vmImgUrl = this.appProperties.filesImgUrl;

  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {
  }

  ngOnInit() {
    this.payCode = urlParse(window.location.href)['payCode'];
    this.orderType = urlParse(window.location.href)['orderType'];
    this.totalPrice = urlParse(window.location.href)['nowPrice'];
    this.refundPrice = this.totalPrice;
    this.getData();
  }
  /**
   * 2019-02-14
   * @author maiziyao
   * 获取订单商品列表
   */
  getData() {
    this.appService.postFormData(this.appProperties.getOrderItemListUrl, {
      payCode: this.payCode,
      orderType: this.orderType
    }, getToken()).subscribe(
      data => {
        if (data.status === 1) {
          this.orderItemList = data.returnObject;
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
   * 返回我的订单
   */
  goTo() {
    this.router.navigate(['cMain/myOrder'], {
      queryParams: {
        type: this.orderType,
        flag: this.flag
      }
    });
  }
  /**
   * 2019-02-14
   * @author maiziyao
   * 提交退款申请
   */
  applySubmit() {
    if (this.refundReason === null || this.refundReason === undefined || this.refundReason === '') {
      alert('请输入退款原因!');
      return;
    } else if (this.refundPrice === null || this.refundPrice === undefined || this.refundPrice === '') {
      alert('请输入退款金额！');
      return;
    } else if (this.refundPrice > this.totalPrice) {
      alert('退款金额不能大于最大金额，请重新输入！');
      return;
    } else {
      this.appService.postAliData(this.appProperties.applyRefundUrl, {
        payCode: this.payCode,
        orderType: this.orderType,
        reason: this.refundReason,
        refundPrice: this.refundPrice
      }, getToken()).subscribe(
        data => {
          if (data.status === 1) {
            alert(data.message);
            this.router.navigate(['cMain/myOrder']);
          } else {
            alert(data.message);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
