import {AfterContentInit, Component, Inject, OnInit} from '@angular/core';
import {getAdminToken} from '../../../utils/util';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';

@Component({
  selector: 'app-replenishment-detail',
  templateUrl: './replenishment-detail.component.html',
  styleUrls: ['./replenishment-detail.component.css']
})
export class ReplenishmentDetailComponent implements OnInit, AfterContentInit {
  public imgUrl = this.appProperties.appUrl + '/files/';
  public value = '';
  public loading: boolean;
  public isVisible = false;
  public isConfirmLoadingSails = false;
  public initList = [];
  public replenishList = [];
  public tradeDetailList = [];
  public nzOptions = [];
  public selectValues: string;
  public homeValues: string;
  public homeValuesList = [{value: '', label: '所有', isLeaf: true}];
  public vmCode: string;
  public tradeDetailListLoading = true;
  constructor(private modalService: NzModalService,
              private appProperties: AppProperties,
              @Inject('replenishment') private replenishmentService) {
    this.loading = true;
  }
  ngAfterContentInit(): void {
  }
  ngOnInit() {
    console.log(getAdminToken());
    const initObj = this.replenishmentService.getInitData();
    console.log(initObj);
    if (initObj.homeValuesList.length !== 0) {
      this.loading = false;
    }
    this.nzOptions = initObj.nzOptions;
    this.homeValuesList = initObj.homeValuesList;
    this.replenishList = initObj.replenishList;
    this.initList = initObj.initList;
  }
  // 监听input改变
  onChanges(event) {
    console.log(this.selectValues[0]);
  }
  // 监听input改变
  onHomeChanges(e) {
    console.log(this.homeValues[0]);
  }
  // 搜索查询售货机列表
  onSearch() {
    console.log(this.value);
    let rate, companyId;
    if (this.selectValues) {
      rate = this.selectValues[0];
    }
    if (this.homeValues) {
      companyId = this.homeValues[0];
    }
    const returnObj = this.replenishmentService.searchService(this.value, rate, companyId);
    if (returnObj.replenishList !== 0) {
      this.loading = false;
    }
    console.log(returnObj);
    this.replenishList = returnObj.replenishList;
    this.initList = returnObj.initList;
  }
  // 查看详情记录
  detail(vmCode) {
    let rate;
    if (this.selectValues) {
      rate = this.selectValues[0];
    }
    this.isVisible = true;
    this.tradeDetailList = this.replenishmentService.detailService(vmCode, rate);
    console.log(this.tradeDetailList);
  }
  // 关闭销售记录
  handleCancelSails() {
    this.isVisible = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
  // 打开销售记录
  handleOkSails() {
    this.isVisible = false;
    this.isConfirmLoadingSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
}
