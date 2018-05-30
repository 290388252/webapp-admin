import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AppProperties {
    // public
    public appUrl: string;
    public aliMachineQueryVMListUrl: string;
    public aliMachineQueryDetailUrl: string;
    public aliMachineQueryTradeDetailUrl: string;
    constructor() {
      // Public
      this.appUrl = 'http://47.106.92.82:6662/ys_sms'; // localtest
      this.aliMachineQueryVMListUrl = this.appUrl + '/aliMachine/queryVMList';
      this.aliMachineQueryDetailUrl = this.appUrl + '/aliMachine/queryDetail';
      this.aliMachineQueryTradeDetailUrl = this.appUrl + '/aliMachine/queryTradeDetail';
    }
}
