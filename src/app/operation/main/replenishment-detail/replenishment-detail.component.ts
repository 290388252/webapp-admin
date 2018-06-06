import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit,
  SimpleChanges
} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken} from '../../../utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-replenishment-detail',
  templateUrl: './replenishment-detail.component.html',
  styleUrls: ['./replenishment-detail.component.css']
})
export class ReplenishmentDetailComponent implements OnInit, AfterContentInit {
  public value = '';
  public loading: boolean;
  public isVisible = false;
  public isConfirmLoadingSails = false;
  public initList = [];
  public replenishList = [];
  public homeList = [];
  public tradeDetailList = [];
  public nzOptions = [];
  public selectValues: string;
  public homeValues: string;
  public homeValuesList = [{value: '', label: '所有', isLeaf: true}];
  public vmCode: string;
  public tradeDetailListLoading = true;
  constructor(private router: Router,
              private modalService: NzModalService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
    this.loading = true;
  }
  ngAfterContentInit(): void {
  }
  ngOnInit() {
    console.log(getToken());
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
    this.appService.postAliData(this.appProperties.homeInithUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        this.homeList = data.returnObject;
        this.homeList.forEach(item => {
          this.homeValuesList.push({value: item.id, label: item.name, isLeaf: true});
        });
      },
      error => {
        console.log(error);
      }
    );
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
  onHomeChanges(e) {
    console.log(this.homeValues[0]);
  }
  onSearch() {
    console.log(this.value);
    let rate, companyId;
    if (this.selectValues) {
      rate = this.selectValues[0];
    }
    if (this.homeValues) {
      companyId = this.homeValues[0];
    }
    this.appService.postAliData(this.appProperties.replenishUrl, {
      vmCode: this.value,
      rate: rate,
      companyId: companyId}, getToken()).subscribe(
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
