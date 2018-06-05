import { Component, OnInit } from '@angular/core';
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
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
    this.loading = true;
  }

  ngOnInit() {
    console.log(getToken());
    this.appService.postAliData(this.appProperties.salesUrl, '', getToken()).subscribe(
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
  onSearch() {
    this.appService.postAliData(this.appProperties.salesUrl, '', getToken()).subscribe(
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
  detail(item) {
    this.companyName = item.companyName;
    this.payCode = item.payCode;
    this.price = item.price;
    this.itemName = item.itemName;
    this.ptCode = item.ptCode;
    this.phone = item.phone;
    this.isVisible = true;
  }
  handleCancelSails() {
    this.isVisible = false;
  }
  handleOkSails() {
    this.isVisible = false;
    this.isConfirmLoadingSails = false;
  }
}
