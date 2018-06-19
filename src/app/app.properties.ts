import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AppProperties {
    // public
    public appUrl: string;
    public adminLoginUrl: string;
    public smsSendUrl: string;
    public mainInfoUrl: string;
    public salesUrl: string;
    public replenishUrl: string;
    public homeInithUrl: string;
    public payBeforeSevenDay: string;
    public aliMachineQueryVMListUrl: string;
    public aliMachineQueryDetailUrl: string;
    public aliMachineQueryTradeDetailUrl: string;
    constructor() {
      // Public
      this.appUrl = 'http://192.168.0.104:6662/ys_admin'; // localtest
      // this.appUrl = 'http://47.106.92.82:6662/ys_admin'; // localtest
      this.adminLoginUrl = 'http://47.106.92.82:6662/ys_sms/admin/appLogin';
      this.smsSendUrl = 'http://47.106.92.82:6662/ys_sms/sms/send';
      this.mainInfoUrl = this.appUrl + '/home/initInfo';
      this.salesUrl = this.appUrl + '/home/payRecord';
      this.replenishUrl = this.appUrl + '/home/replenish';
      this.homeInithUrl = this.appUrl + '/home/company';
      this.payBeforeSevenDay = this.appUrl + '/payRecord/payBefore7Day';
      this.aliMachineQueryVMListUrl = this.appUrl + '/aliMachine/queryVMList';
      this.aliMachineQueryDetailUrl = this.appUrl + '/aliMachine/queryItem';
      this.aliMachineQueryTradeDetailUrl = this.appUrl + '/aliMachine/queryTradeDetail';
    }
}
