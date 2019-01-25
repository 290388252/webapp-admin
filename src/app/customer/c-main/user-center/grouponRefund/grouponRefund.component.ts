import {Component, Inject, OnInit} from '@angular/core';
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
  templateUrl: './grouponRefund.component.html',
  styleUrls: ['./grouponRefund.component.css']
})
export class GrouponRefundComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  // get
  //
  public refundType;
  public refundResult;
  public payCode;
  public money;
  public orderId;
  public verify;
  public goodsDetails = {};
  public token;
  public isVisibleCouponOne = false;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    this.orderId = urlParse(window.location.href)['orderId'];
    this.token = getToken();
    this.refundType = '';
    this.verify = false;
    this.getData(this.orderId);
  }

  getData(orderId) {
    this.appService.postFormData(this.appProperties.grouponOrderDetailsUrl, {'orderId': orderId}, this.token).subscribe(
      data => {
        this.payCode = data.shoppingBean.payCode;
        this.money = data.shoppingBean.newPrice;
        this.goodsDetails = data.shoppingBean;
      },
      error => {
        console.log(error);
      }
    );
  }

  submit() {
    if (this.refundType === '') {
      // alert('请选择退款原因');
      this.verify = true;
      setTimeout(() => {
        this.verify = false;
      }, 3000);
    } else {
      this.appService.postAliData(this.appProperties.grouponRefundUrl, {
        'orderType': 3,
        'payCode': this.payCode,
        'refundPrice': this.money,
        'refundGenre': this.refundType,
        'reason': this.refundResult
      }, getToken()).subscribe(
        data => {
          if (data.status === 5001) {
            alert(data.message);
            this.router.navigate(['cMain/grouponOrder']);
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
  }

  // turnData(date) {
  //   const nowDate = new Date(date);
  //   const nowY = nowDate.getFullYear();
  //   const nowM = nowDate.getMonth() + 1;
  //   const nowD = nowDate.getDate();
  //   const endTime = nowY + '' + (nowM < 10 ? '0' + nowM : nowM) + '' + (nowD < 10 ? '0' + nowD : nowD);
  //   return endTime;
  // }
}
