import { Injectable } from '@angular/core';
import {getToken, urlParse} from '../../../utils/util';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {Router} from '@angular/router';

@Injectable()
export class ReplenishmentDetailService {
  constructor(private appService: AppService, private appProperties: AppProperties) {}
  getInitData() {
    let homeList = [];
    const homeValuesList = [{value: '', label: '所有', isLeaf: true}];
    const replenishList = [];
    const initList = [];
    const nzOptions = [
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
    // 获取公司列表数据
    this.appService.postAliData(this.appProperties.homeInithUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        homeList = data.returnObject;
        homeList.forEach(item => {
          homeValuesList.push({value: item.id, label: item.name, isLeaf: true});
        });
      },
      error => {
        console.log(error);
      }
    );
    // 获取初始列表数据
    this.appService.postAliData(this.appProperties.replenishUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        data.returnObject.replenishVMList.forEach(item => {
          replenishList.push(item);
        });
        data.returnObject.replenishList.forEach(item => {
          initList.push(item);
        });
      },
      error => {
        console.log(error);
      }
    );
    return {nzOptions, homeList, homeValuesList, replenishList, initList};
  }
  // 查看详情记录
  detailService(vmCode, rate) {
    const tradeDetailList = [];
    this.appService.postAliData(this.appProperties.replenishUrl, {vmCode: vmCode, rate: rate}, getToken()).subscribe(
      data => {
        data.returnObject.replenishList.forEach(item => {
          tradeDetailList.push(item);
        });
      },
      error => {
        console.log(error);
      }
    );
    return tradeDetailList;
  }
  searchService(vmCode, rate, companyId) {
    const replenishList = [];
    const initList = [];
    this.appService.postAliData(this.appProperties.replenishUrl, {
      vmCode: vmCode,
      rate: rate,
      companyId: companyId}, getToken()).subscribe(
      data => {
        console.log(data);
        // this.loading = false;
        data.returnObject.replenishVMList.forEach(item => {
          replenishList.push(item);
        });
        data.returnObject.replenishList.forEach(item => {
          initList.push(item);
        });
      },
      error => {
        console.log(error);
      }
    );
    return {replenishList, initList};
  }
}