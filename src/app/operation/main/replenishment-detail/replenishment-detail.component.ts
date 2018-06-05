import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken} from '../../../utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-replenishment-detail',
  templateUrl: './replenishment-detail.component.html',
  styleUrls: ['./replenishment-detail.component.css']
})
export class ReplenishmentDetailComponent implements OnInit {
  public value = '';
  public loading: boolean;
  public isVisible = false;
  public isConfirmLoadingSails = false;
  public replenishList = [];
  public tradeDetailList = [];
  public vmCode: string;
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
    this.appService.postAliData(this.appProperties.replenishUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.replenishList = data.returnObject.replenishVMList;
      },
      error => {
        console.log(error);
      }
    );
  }
  onSearch() {
    this.appService.postAliData(this.appProperties.replenishUrl, {vmCode: this.value}, getToken()).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.replenishList = data.returnObject.replenishVMList;
      },
      error => {
        console.log(error);
      }
    );
  }
  detail(vmCode) {
    this.isVisible = true;
    this.appService.postAliData(this.appProperties.replenishUrl, {vmCode: vmCode}, getToken()).subscribe(
      data => {
        console.log(data);
        this.tradeDetailList = data.returnObject.replenishVMList;
      },
      error => {
        console.log(error);
      }
    );
  }
  handleCancelSails() {
    this.isVisible = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
  handleOkSails() {
    this.isVisible = false;
    this.isConfirmLoadingSails = false;
    this.tradeDetailListLoading = true;
    this.tradeDetailList = [];
  }
}
