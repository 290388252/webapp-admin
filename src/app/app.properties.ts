import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AppProperties {
    // public
    public appUrl: string;
    public smsUrl: string;
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
    public vendingMachinesInfoListPageUrl: string;
    public vendingMachinesInfoNearbyListPageUrl: string;
    public vendingLineFindLineByForm: string;

    // Shopping Mall
    public shopingLogin: string;
    public shoppingGoodsUrl: string;
    public shoppingGoodsDetailUrl: string;
    public shoppingCarUrl: string;
    public shoppingAddUrl: string;
    public shoppingUpdateUrl: string;
    public shopImgUrl: string;
    public shopFrontCouponMyListUrl: string;
    public shopSpecialGoodsUrl: string;
    public shopFrontCouponAddCouponToCustomerUrl: string;
    public shopStoreOrderAddUrl: string;
    public shopStoreOrderFindUrl: string;
    // public shopStoreUpdateUrl: string;
    public shopUnifiedStoreOrderUrl: string;
    public orderUnifiedOrderUrl: string;
    public shopAddressSelectUrl: string;
    public shopAddressUpdateUrl: string;
    public shopAddressAddUrl: string;
    public shopAddCouponUrl: string;
    public shopGetPickRecordUrl: string;
    public shopCustomerGetStockUrl: string;
    constructor() {
      // Public
      this.appUrl = 'http://192.168.0.117:8769/ys_admin'; // localtest

      this.smsUrl = 'http://192.168.0.117:8769/ys_sms'; // localtest
      // this.appUrl = 'http://119.23.233.123:6662/ys_admin';
      // this.smsUrl = 'http://47.106.92.82:6662/ys_sms';
      this.adminLoginUrl = this.smsUrl + '/admin/appLogin ';
      this.smsSendUrl = this.smsUrl + '/sms/send';
      this.mainInfoUrl = this.appUrl + '/home/initInfo';
      this.salesUrl = this.appUrl + '/home/payRecord';
      this.replenishUrl = this.appUrl + '/home/replenish';
      this.homeInithUrl = this.appUrl + '/home/company';
      this.payBeforeSevenDay = this.appUrl + '/payRecord/payBefore7Day';
      this.aliMachineQueryVMListUrl = this.appUrl + '/aliMachine/queryVMList';
      this.aliMachineQueryDetailUrl = this.appUrl + '/aliMachine/queryItem';
      this.aliMachineQueryTradeDetailUrl = this.appUrl + '/aliMachine/queryTradeDetail';
      // this.vendingMachinesInfoListPageUrl = 'http://192.168.0.104:6662/ys_admin' + '/vendingMachinesInfo/listPage';
      this.vendingLineFindLineByForm = this.appUrl +  '/vendingLine/findLineByForm';
      this.vendingMachinesInfoListPageUrl = this.appUrl + '/vendingMachinesInfo/listPage';
      this.vendingMachinesInfoNearbyListPageUrl = this.appUrl + '/vendingMachinesInfo/nearbyListPage?';

      // Shopping Mall
      this.shopingLogin = this.smsUrl + '/admin/shopRegister';
      this.shoppingGoodsUrl = this.appUrl + '/shoppingGoods/list';
      this.shoppingGoodsDetailUrl = this.appUrl + '/shoppingGoods/productDetails';
      this.shoppingCarUrl = this.appUrl + '/shoppingCar/appListPage';
      this.shopImgUrl = this.appUrl + '/shoppingGoodsImg/';
      this.shoppingAddUrl = this.appUrl + '/shoppingCar/add';
      this.shoppingUpdateUrl = this.appUrl + '/shoppingCar/update';
      this.shopStoreOrderAddUrl = this.appUrl + '/order/storeOrderAdd';
      this.shopStoreOrderFindUrl = this.appUrl + '/order/storeOrderFind';
      // this.shopStoreUpdateUrl = this.appUrl + '/order/storeOrderUpdate';
      this.shopUnifiedStoreOrderUrl = this.appUrl + '/order/storeOrderPay';
      this.shopAddressSelectUrl = this.appUrl + '/address/select';
      this.shopAddressUpdateUrl = this.appUrl + '/address/update';
      this.shopAddressAddUrl = this.appUrl + '/address/add';
      this.shopFrontCouponMyListUrl = this.appUrl + '/frontCoupon/myList';
      this.shopSpecialGoodsUrl = this.appUrl + '/frontCoupon/findShoppingGoodsBean';
      this.shopFrontCouponAddCouponToCustomerUrl = this.appUrl + '/frontCoupon/addCouponToCustomer';
      this.shopAddCouponUrl = this.appUrl + '/order/customerCoupon';
      this.orderUnifiedOrderUrl = this.smsUrl + '/order/unifiedOrder';
      this.shopGetPickRecordUrl = this.appUrl + '/storeCustomer/getPickRecord';
      this.shopCustomerGetStockUrl = this.appUrl + '/storeCustomer/getStock';
    }
}
