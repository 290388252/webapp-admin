import {AfterContentInit, Component, Inject, OnInit} from '@angular/core';
import {getAdminToken} from '../../../utils/util';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';
import {Router} from "@angular/router";
import {AppService} from "../../../app-service";

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
  public selectValues = '0.3';
  public homeValues: string;
  public versionValues = '1';
  public otherCompanyId: string;
  public homeValuesList = [{value: '', label: '所有', isLeaf: true}];
  public otherCompanyValuesList = [{value: '', label: '所有', isLeaf: true}];
  public versionValuesList = [{value: '1', label: '版本1', isLeaf: true}, {value: '2', label: '版本2', isLeaf: true}];
  public vmCode: string;
  public tradeDetailListLoading = true;

  constructor(private modalService: NzModalService,
              private appProperties: AppProperties,
              private appService: AppService,
              private router: Router,
              @Inject('replenishment') private replenishmentService) {
    this.loading = true;
  }

  ngAfterContentInit(): void {
  }

  ngOnInit() {
    const initObj = this.replenishmentService.getInitData();
    if (initObj.homeValuesList.length !== 0) {
      this.loading = false;
    }
    this.nzOptions = initObj.nzOptions;
    this.homeValuesList = initObj.homeValuesList;
    this.replenishList = initObj.replenishList;
    this.initList = initObj.initList;
    this.otherCompanyValuesList = initObj.otherCompanyValuesList;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 监听input改变
   */
  onChanges(event) {
    console.log(this.selectValues[0]);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 监听input改变
   */
  onHomeChanges(e) {
    console.log(this.homeValues[0]);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 搜索查询售货机列表
   */
  onSearch() {
    let rate, companyId;
    if (this.selectValues) {
      rate = this.selectValues[0];
    }
    if (this.homeValues) {
      companyId = this.homeValues[0];
    }
    const returnObj = this.replenishmentService.searchService(this.value, rate, companyId, this.versionValues, this.otherCompanyId);
    if (returnObj.replenishList !== 0) {
      this.loading = false;
    }
    this.replenishList = returnObj.replenishList;
    this.initList = returnObj.initList;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 跳转到地图搜索
   */
  onBaidu() {
    this.router.navigate(['main/map']);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 四舍五入转换
   */
  round(ratio) {
    return Math.round(ratio * 100);
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 转换
   */
  replenishDetail(list) {
    let text;
    const name = list.name === '' ? '无名' : list.name;
    // if (list.fullNum - list.num === 0) {
    // text = `${name}/已满`;
    // } else {
    text = `${name}/补${list.fullNum - list.num} ${list.num}/${list.fullNum}`;
    // }
    return text;
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 查看详情记录
   */
  detail(vmCode) {
    let rate;
    if (this.selectValues) {
      rate = this.selectValues[0];
    }
    this.isVisible = true;
    this.tradeDetailList = this.replenishmentService.detailService(vmCode, rate);
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 关闭销售记录
   */
  handleCancelSails() {
    this.isVisible = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 打开销售记录
   */
  handleOkSails() {
    this.isVisible = false;
    this.isConfirmLoadingSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
}
