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
    public aliMachineQueryVMListUrl: string;
    public aliMachineQueryDetailUrl: string;
    public aliMachineQueryTradeDetailUrl: string;
    constructor() {
      // Public
      this.appUrl = 'http://youshuismallhe.natapp1.cc'; // localtest
      // this.appUrl = 'http://47.106.92.82:6662/ys_sms'; // localtest
      this.adminLoginUrl = this.appUrl + '/admin/login';
      this.smsSendUrl = this.appUrl + '/sms/send';
      this.mainInfoUrl = this.appUrl + '/home/initInfo';
      this.salesUrl = this.appUrl + '/home/payRecord';
      this.replenishUrl = this.appUrl + '/home/replenish';
      this.aliMachineQueryVMListUrl = this.appUrl + '/aliMachine/queryVMList';
      this.aliMachineQueryDetailUrl = this.appUrl + '/aliUser/queryItem';
      this.aliMachineQueryTradeDetailUrl = this.appUrl + '/aliMachine/queryTradeDetail';
    }
}
