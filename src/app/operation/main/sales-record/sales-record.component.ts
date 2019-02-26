import {Component, Inject, OnInit} from '@angular/core';
import {getAdminToken, urlParse} from '../../../utils/util';
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
  public hidden = true;
  public hiddenData = false;
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
              @Inject('salesRecord') private salesRecordService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }

  ngOnInit() {
    console.log(getAdminToken());
    // const returnObj = this.salesRecordService.getSalesInitData();
    this.appService.postAliData(this.appProperties.salesUrl, '', getAdminToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.hidden = true;
          this.hiddenData = false;
          this.loading = false;
          this.saleList = data.returnObject;
        } else if (data.status === 0) {
          this.hidden = false;
          this.hiddenData = true;
        }
      },
      error => {
        console.log(error);
      }
    );
    // this.appService.postAliData(this.appProperties.salesUrl, '', getAdminToken()).subscribe(
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

  /**
   * 2019-02-16
   * @author maiziyao
   * 搜索查询售货机列表
   */
  onSearch() {
    this.appService.postAliData(this.appProperties.salesUrl, {payCodeOrName: this.value}, getAdminToken()).subscribe(
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

  /**
   * 2019-02-16
   * @author maiziyao
   * 查看详情记录
   */
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

  /**
   * 2019-02-16
   * @author maiziyao
   * 关闭销售记录
   */
  handleCancelSails() {
    this.isVisible = false;
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 打开销售记录
   */
  handleOkSails() {
    this.isVisible = false;
    this.isConfirmLoadingSails = false;
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 转换日期格式
   */
  toDate(date) {
    return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate();
  }
}
