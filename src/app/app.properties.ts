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

    // Shopping Mall
    public shopingLogin: string;
    public shoppingGoodsUrl: string;
    public shoppingCarUrl: string;
    public shoppingAddUrl: string;
    public shoppingUpdateUrl: string;
    public shopImgUrl: string;
    constructor() {
      // Public
      this.appUrl = 'http://192.168.0.104:6662/ys_admin'; // localtest
      // this.appUrl = 'http://119.23.233.123:6662/ys_admin'; // localtest
      this.adminLoginUrl = 'http://47.106.92.82:6662/ys_sms/admin/appLogin';
      this.smsSendUrl = 'http://192.168.0.123:8769/ys-sms/sms/send';
      // this.smsSendUrl = 'http://47.106.92.82:6662/ys_sms/sms/send';
      this.mainInfoUrl = this.appUrl + '/home/initInfo';
      this.salesUrl = this.appUrl + '/home/payRecord';
      this.replenishUrl = this.appUrl + '/home/replenish';
      this.homeInithUrl = this.appUrl + '/home/company';
      this.payBeforeSevenDay = this.appUrl + '/payRecord/payBefore7Day';
      this.aliMachineQueryVMListUrl = this.appUrl + '/aliMachine/queryVMList';
      this.aliMachineQueryDetailUrl = this.appUrl + '/aliMachine/queryItem';
      this.aliMachineQueryTradeDetailUrl = this.appUrl + '/aliMachine/queryTradeDetail';

      // Shopping Mall
      this.shopingLogin = 'http://192.168.0.123:8769/ys-sms' + '/admin/shopRegister';
      // this.shopingLogin = 'http://47.106.92.82:6662/ys_sms/admin/shopRegister';
      this.shoppingGoodsUrl = this.appUrl + '/shoppingGoods/list';
      this.shoppingCarUrl = this.appUrl + '/shoppingCar/appListPage';
      this.shopImgUrl = this.appUrl + '/shoppingGoodsImg/';
      this.shoppingAddUrl = this.appUrl + '/shoppingCar/add';
      this.shoppingUpdateUrl = this.appUrl + '/shoppingCar/update';
    }
}
