import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';
import {AppService} from '../../../app-service';
import {getToken, urlParse} from '../../../utils/util';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.css']
})
export class MachineDetailComponent implements OnInit {
  public _value = '';
  public loading: boolean;
  public isVisible = false;
  public isVisibleSails = false;
  public isConfirmLoading = false;
  public isConfirmLoadingSails = false;
  public vmList = [];
  public detailList = [];
  public tradeDetailList = [];
  public vmCode: string;
  public detailListLoading = true;
  public tradeDetailListLoading = true;
  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
    this.loading = true;
  }

  ngOnInit() {
    console.log(getToken());
    this.appService.postAliData(this.appProperties.aliMachineQueryVMListUrl, '' , getToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.loading = false;
          this.vmList = data.returnObject;
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // 搜索查询售货机列表
  onSearch(): void {
    console.log(this._value);
    this.appService.postAliData(this.appProperties.aliMachineQueryVMListUrl + '?form=' + this._value,
      '' , getToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.vmList = data.returnObject;
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // 售货机详情
  detail(vmCode) {
    this.isVisible = true;
    this.vmCode = vmCode;
    this.appService.getAliData(this.appProperties.aliMachineQueryDetailUrl,
      {vmCode: this.vmCode}, getToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          if (!data.willGo) {
            this.detailListLoading = false;
            this.detailList = data.returnObject;
          }
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // 销售记录查询
  sails(vmCode) {
    const yesterday = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2);
    const tomorrow = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    let yesterdayMonth;
    let yesterdayDate;
    let tomorrowMonth;
    let tomorrowDate;
    if ((yesterday.getMonth() + 1).toString().length === 1) {
      yesterdayMonth = '0' + (yesterday.getMonth() + 1).toString();
    } else {
      yesterdayMonth = (yesterday.getMonth() + 1).toString();
    }
    if ((yesterday.getDate()).toString().length === 1) {
      yesterdayDate = '0' + (yesterday.getDate()).toString();
    } else {
      yesterdayDate = (yesterday.getDate()).toString();
    }
    if ((tomorrow.getMonth() + 1).toString().length === 1) {
      tomorrowMonth = '0' + (tomorrow.getMonth() + 1).toString();
    } else {
      tomorrowMonth = (tomorrow.getMonth() + 1).toString();
    }
    if ((tomorrow.getDate()).toString().length === 1) {
      tomorrowDate = '0' + (tomorrow.getDate()).toString();
    } else {
      tomorrowDate = (tomorrow.getDate()).toString();
    }
    const startDate = `${yesterday.getFullYear()}-${yesterdayMonth}-${yesterdayDate}`;
    const endDate = `${tomorrow.getFullYear()}-${tomorrowMonth}-${tomorrowDate}`;
    this.isVisibleSails = true;
    this.appService.postAliData(this.appProperties.aliMachineQueryTradeDetailUrl,
      {
        vmCode: vmCode,
        startDate: startDate,
        endDate: endDate
      } , getToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.tradeDetailList = data.returnObject;
          this.tradeDetailListLoading = false;
        } else {
          alert('查询失败无数据');
          this.isVisibleSails = false;
          this.tradeDetailListLoading = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // 打开详情记录
  handleOk(): void {
    this.isVisible = false;
    this.isConfirmLoading = false;
    this.detailListLoading = true;
    this.detailList = [];
  }
  // 关闭详情记录
  handleCancel(): void {
    this.isVisible = false;
    this.detailListLoading = true;
    this.detailList = [];
  }
  // 打开销售记录
  handleOkSails(): void {
    this.isVisibleSails = false;
    this.isConfirmLoadingSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
  // 关闭销售记录
  handleCancelSails(): void {
    this.isVisibleSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
}
