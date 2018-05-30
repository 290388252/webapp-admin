import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';
import {AppService} from '../../../app-service';
import {urlParse} from '../../../utils/util';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.css']
})
export class MachineDetailComponent implements OnInit {
  public _value = '';
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
  }

  ngOnInit() {
    // this.appService.postAliData(this.appProperties.aliMachineQueryVMListUrl, '' , urlParse(window.location.search)['token']).subscribe(
    //   data => {
    //     console.log(data);
    //     if (data.status === 1) {
    //       this.vmList = data.returnObject;
    //     } else {
    //       alert(data.message);
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
  onSearch(): void {
    console.log(this._value);
    // this.appService.postAliData(this.appProperties.aliMachineQueryVMListUrl + '?form=' + this._value,
    //   '' , urlParse(window.location.search)['token']).subscribe(
    //   data => {
    //     console.log(data);
    //     if (data.status === 1) {
    //       this.vmList = data.returnObject;
    //     } else {
    //       alert(data.message);
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
  detail(vmCode) {
    this.isVisible = true;
    this.vmCode = vmCode;
    this.appService.postAliData(this.appProperties.aliMachineQueryDetailUrl + '?vmCode=' + vmCode,
      '' , urlParse(window.location.search)['token']).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.detailList = data.returnObject;
          this.detailListLoading = false;
        } else {
          alert('查询失败无数据');
          this.isVisible = false;
          this.detailListLoading = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  sails(vmCode) {
    const yesterday = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2);
    const tomorrow = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    const startDate = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;
    const endDate = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
    this.isVisibleSails = true;
    this.appService.postAliData(this.appProperties.aliMachineQueryTradeDetailUrl,
      {
        vmCode: vmCode,
        startDate: startDate,
        endDate: endDate
      } , urlParse(window.location.search)['token']).subscribe(
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
  handleOk(): void {
    this.isVisible = false;
    this.isConfirmLoading = false;
    this.detailListLoading = true;
    this.detailList = [];
  }

  handleCancel(): void {
    this.isVisible = false;
    this.detailListLoading = true;
    this.detailList = [];
  }
  handleOkSails(): void {
    this.isVisibleSails = false;
    this.isConfirmLoadingSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }

  handleCancelSails(): void {
    this.isVisibleSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
}
