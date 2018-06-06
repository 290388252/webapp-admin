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
  public initList = [];
  public replenishList = [];
  public tradeDetailList = [];
  public nzOptions = [];
  public selectValues: string;
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
    this.nzOptions = [
      {value: '', label: '所有', isLeaf: true},
      {value: '0', label: '0%', isLeaf: true},
      {value: '0.1', label: '10%', isLeaf: true},
      {value: '0.2', label: '20%', isLeaf: true},
      {value: '0.3', label: '30%', isLeaf: true},
      {value: '0.4', label: '40%', isLeaf: true},
      {value: '0.5', label: '50%', isLeaf: true},
      {value: '0.6', label: '60%', isLeaf: true},
      {value: '0.7', label: '70%', isLeaf: true},
      {value: '0.8', label: '80%', isLeaf: true},
      {value: '0.9', label: '90%', isLeaf: true},
      {value: '1', label: '100%', isLeaf: true}
      ];
    console.log(getToken());
    this.appService.postAliData(this.appProperties.replenishUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.replenishList = data.returnObject.replenishVMList;
        this.initList = data.returnObject.replenishList;
      },
      error => {
        console.log(error);
      }
    );
  }
  onChanges(event) {
    console.log(this.selectValues[0]);
  }
  onSearch() {
    this.appService.postAliData(this.appProperties.replenishUrl, {vmCode: this.value, rate: this.selectValues[0]}, getToken()).subscribe(
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
        this.tradeDetailList = data.returnObject.replenishList;
        console.log(this.tradeDetailList);
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
