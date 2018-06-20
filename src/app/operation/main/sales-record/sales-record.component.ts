import {Component, Inject, OnInit} from '@angular/core';
import {getToken, urlParse} from '../../../utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-sales-record',
  templateUrl: './sales-record.component.html',
  styleUrls: ['./sales-record.component.css']
})
export class SalesRecordComponent implements OnInit {
  public value = '';
  public loading: boolean;
  public isVisible = false;
  public isConfirmLoadingSails = false;
  public saleList = [];
  public vmCode: string;
  public companyName: string;
  public payCode: string;
  public price: string;
  public createTime: string;
  public itemName: string;
  public ptCode: string;
  public phone: string;
  constructor(private router: Router,
              private modalService: NzModalService,
              @Inject('salesRecord')  private salesRecordService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
    this.loading = true;
  }

  ngOnInit() {
    console.log(getToken());
    const returnObj = this.salesRecordService.getSalesInitData();
    console.log(returnObj.loading);
    this.saleList = returnObj.saleList;
    if (this.saleList.length !== 0) {
      this.loading = false;
    }
    // this.appService.postAliData(this.appProperties.salesUrl, '', getToken()).subscribe(
    //   data => {
    //     console.log(data);
    //     this.loading = false;
    //     this.saleList = data.returnObject;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
  // 搜索查询售货机列表
  onSearch() {
    this.appService.postAliData(this.appProperties.salesUrl, {payCodeOrName: this.value}, getToken()).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.saleList = data.returnObject;
      },
      error => {
        console.log(error);
      }
    );
  }
  // 查看详情记录
  detail(item) {
    this.companyName = item.companyName;
    this.payCode = item.payCode;
    this.price = item.price;
    this.itemName = item.itemName;
    this.ptCode = item.ptCode;
    this.phone = item.phone;
    this.createTime = item.createTime;
    this.isVisible = true;
  }
  // 关闭销售记录
  handleCancelSails() {
    this.isVisible = false;
  }
  // 打开销售记录
  handleOkSails() {
    this.isVisible = false;
    this.isConfirmLoadingSails = false;
  }
}
