import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';
import {AppService} from '../../../app-service';
import {getAdminToken, urlParse} from '../../../utils/util';

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
  public machineVersion;
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
    this.appService.postAliData(this.appProperties.aliMachineQueryVMListUrl, '', getAdminToken()).subscribe(
      data => {
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 搜索查询售货机列表
   */
  onSearch(): void {
    this.appService.postAliData(this.appProperties.aliMachineQueryVMListUrl + '?form=' + this._value,
      '', getAdminToken()).subscribe(
      data => {
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 售货机详情
   */
  detail(vmCode, version) {
    this.isVisible = true;
    this.vmCode = vmCode;
    this.machineVersion = version;
    document.getElementsByClassName('ant-modal-body')[1]['style'].cssText = 'padding: 10px;';
    this.appService.getAliData(this.appProperties.aliMachineQueryDetailUrl,
      {vmCode: this.vmCode, machineVersion: this.machineVersion}, getAdminToken()).subscribe(
      data => {
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

  /**
   * 2019-02-15
   * @author maiziyao
   * 销售记录查询
   */
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
    this.appService.getAliData(this.appProperties.aliMachineQueryTradeDetailUrl,
      {
        vmCode: vmCode,
        day: 3
      }, getAdminToken()).subscribe(
      data => {
        this.tradeDetailList = data;
        this.tradeDetailListLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 打开详情记录
   */
  handleOk(): void {
    this.isVisible = false;
    this.isConfirmLoading = false;
    this.detailListLoading = true;
    this.detailList = [];
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭详情记录
   */
  handleCancel(): void {
    this.isVisible = false;
    this.detailListLoading = true;
    this.detailList = [];
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 打开销售记录
   */
  handleOkSails(): void {
    this.isVisibleSails = false;
    this.isConfirmLoadingSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭销售记录
   */
  handleCancelSails(): void {
    this.isVisibleSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 转换日期兼容ios
   */
  toDate(date) {
    return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate();
  }
}
