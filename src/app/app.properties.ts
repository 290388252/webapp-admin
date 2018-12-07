import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AppProperties {
  // public
  public appUrl: string;
  public smsUrl: string;
  public adminLoginUrl: string;
  public adminGetShopTokenUrl: string;
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
  public litOtherCompanyForSelectUrl: string;
  public vendingLineFindLineByForm: string;

  // Shopping Mall
  public shopingLogin: string;
  public shoppingGoodsUrl: string;
  public shoppingGoodsDetailUrl: string;
  public shoppingGrouponMemberQuantity: string;
  public shoppingNewJudgeUrl: string;
  public shoppingCarUrl: string;
  public shoppingAddUrl: string;
  public shoppingUpdateUrl: string;
  public shopImgUrl: string;
  public filesImgUrl: string;
  public promotionsImgUrl: string;
  public shopFrontCouponMyListUrl: string;
  public shopSpecialGoodsUrl: string;
  public shopFrontCouponAddCouponToCustomerUrl: string;
  public shoppingWaterCouponUrl: string;
  public shoppingPromotionsUrl: string;
  public shopStoreOrderAddUrl: string;
  public shopStoreOrderFindUrl: string;
  public shopVipCarListUrl: string;
  public judgeVipUrl;
  public shopVipBuyUrl;
  public shopVipAddUrl;
  public grouponAddUrl;
  public grouponBuyUrl;
  public wechatShareInfoUrl;
  public couponAddAsianCustomer: string;
  // public shopStoreUpdateUrl: string;
  public shopUnifiedStoreOrderUrl: string;
  public orderUnifiedOrderUrl: string;
  public shopAddressSelectUrl: string;
  public grouponJudgeAddressUrl: string;
  public shopAddressShow: string;
  public mapDetailsAUrl: string;
  public mapDetailsBUrl: string;
  public shopAddressUpdateUrl: string;
  public shopAddressCheckUrl: string;
  public shopAddressAddUrl: string;
  public shopAddCouponUrl: string;
  public shopGetPickRecordUrl: string;
  public shopCustomerGetStockUrl: string;
  public shopUserMoneyUrl: string;
  public shopPrepaidAddUrl: string;
  public shopPrepaidBuyUrl: string;
  public payFinishShowUrl: string;
  public payFinishGetCouponUrl: string;
  public detailCartAndBuyUrl: string;

  public shopCarSaveUrl: string;
  public backSelectUrl: string;
  public shopCarDelUrl: string;
  public shopCouponListUrl: string;
  public applyRefundUrl: string;
  public getOrderItemListUrl: string;
  public IfApplayRefundUrl: string;
  /*故障申报*/
  public complainImgUrl: string;
  public tblCustomerMyDeclaration: string;
  public tblCustomerComplainReplyIsReplyUrl: string;
  public tblCustomerComplainReplyAddUrl: string;

  constructor() {
    // this.appUrl = 'http://192.168.0.114:6662/ys_admin';
    // this.appUrl = 'http://192.168.0.113:8769/ys_admin'; // localtest
    // this.appUrl = 'http://192.168.0.106:6662/ys_admin'; // localtest
    this.appUrl = 'http://119.23.233.123:6662/ys_admin/';
    this.smsUrl = 'http://47.106.92.82:6662/ys_sms';

    this.adminLoginUrl = this.smsUrl + '/admin/appLogin ';
    this.adminGetShopTokenUrl = this.smsUrl + '/admin/getShopToken1';
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
    this.vendingLineFindLineByForm = this.appUrl + '/vendingLine/findLineByForm';
    this.vendingMachinesInfoListPageUrl = this.appUrl + '/vendingMachinesInfo/listPage';
    this.vendingMachinesInfoNearbyListPageUrl = this.appUrl + '/vendingMachinesInfo/nearbyListPage?';
    this.litOtherCompanyForSelectUrl = this.appUrl + '/replenishCompanyMachines/listOtherCompanyForSelect';
    // Shopping Mall
    this.shopingLogin = this.smsUrl + '/admin/shopRegister';
    this.shoppingGoodsUrl = this.appUrl + '/shoppingGoods/list';
    this.shoppingGoodsDetailUrl = this.appUrl + '/shoppingGoods/productDetails';
    this.shoppingGrouponMemberQuantity = this.appUrl + '/tblCustomerSpellGroup/list';
    this.shoppingNewJudgeUrl = this.appUrl + '/tblCustomerSpellGroup/isRepeatedSpellGroup';
    this.shoppingCarUrl = this.appUrl + '/shoppingCar/appListPage';
    this.shopImgUrl = this.appUrl + '/shoppingGoodsImg/';
    this.filesImgUrl = this.appUrl + '/files/';
    this.promotionsImgUrl = this.appUrl + '/vmAdvertisingImg/';
    this.shoppingAddUrl = this.appUrl + '/shoppingCar/add';
    this.shoppingUpdateUrl = this.appUrl + '/shoppingCar/update';
    this.shopStoreOrderAddUrl = this.appUrl + '/order/storeOrderAdd';
    this.shopStoreOrderFindUrl = this.appUrl + '/order/storeOrderFind';
    // this.shopStoreUpdateUrl = this.appUrl + '/order/storeOrderUpdate';
    this.shopUnifiedStoreOrderUrl = this.appUrl + '/order/storeOrderPay';
    this.shopAddressSelectUrl = this.appUrl + '/address/select';
    this.grouponJudgeAddressUrl = this.appUrl + '/order/checkGroupIfneedAddress';
    this.shopAddressShow = this.appUrl + '/order/checkIfneedAddress';
    this.mapDetailsAUrl = this.appUrl + '/vendingMachinesWay/listAll';
    this.mapDetailsBUrl = this.appUrl + '/vendingMachinesWay/listAll2';
    this.shopAddressUpdateUrl = this.appUrl + '/address/update';
    this.shopAddressCheckUrl = this.appUrl + '/address/selectById';
    this.shopAddressAddUrl = this.appUrl + '/address/add';
    this.shopFrontCouponMyListUrl = this.appUrl + '/frontCoupon/myList';
    this.shopSpecialGoodsUrl = this.appUrl + '/frontCoupon/findShoppingGoodsBean';
    this.shopFrontCouponAddCouponToCustomerUrl = this.appUrl + '/frontCoupon/addCouponToCustomer';
    this.shoppingWaterCouponUrl = this.appUrl + '/carryWaterVouchersCustomer/myCarryWaterVouchers';
    this.shoppingPromotionsUrl = this.appUrl + '/vendingMachinesAdvertising/list';
    this.shopAddCouponUrl = this.appUrl + '/order/customerCoupon';
    this.orderUnifiedOrderUrl = this.smsUrl + '/order/unifiedOrder';
    this.shopGetPickRecordUrl = this.appUrl + '/storeCustomer/getPickRecord';
    this.shopCustomerGetStockUrl = this.appUrl + '/storeCustomer/getStock';
    this.shopVipCarListUrl = this.appUrl + '/memberType/list';
    this.judgeVipUrl = this.appUrl + '/member/judgeMember';
    this.shopVipBuyUrl = this.appUrl + '/memberOrder/payMemebr';
    this.shopVipAddUrl = this.appUrl + '/memberOrder/add';
    this.shopUserMoneyUrl = this.appUrl + '/tblCustomerWx/getBean';
    // this.shopUserMoneyUrl = this.appUrl + '/member/findBean';
    this.shopPrepaidAddUrl = this.appUrl + '/memberOrder/add';
    this.shopPrepaidBuyUrl = this.appUrl + '/memberOrder/payBalance';
    this.grouponAddUrl = this.appUrl + '/order/storeOrderSpellGroupAdd';
    this.grouponBuyUrl = this.appUrl + '/order/storeOrderSpellGroupPay';
    this.wechatShareInfoUrl = this.smsUrl + '/wechat/shareInfo';
    this.couponAddAsianCustomer = this.appUrl + '/coupon/addAsianCustomer';

    this.payFinishShowUrl = this.appUrl + '/order/storeOrderFininshPay';
    this.payFinishGetCouponUrl = this.appUrl + '/coupon/get';
    this.shopCarSaveUrl = this.appUrl + '/shoppingCar/save';
    this.backSelectUrl = this.appUrl + '/shoppingCar/backSelect';
    this.shopCarDelUrl = this.appUrl + '/shoppingCar/del';
    this.shopCouponListUrl = this.appUrl + '/frontCoupon/myList';
    this.detailCartAndBuyUrl = this.appUrl + '/shoppingCar/addAndBuy';
    this.applyRefundUrl = this.appUrl + '/refundApplication/do';
    this.getOrderItemListUrl = this.appUrl + '/payRecord/getPayRecordItemList';
    this.IfApplayRefundUrl = this.appUrl + '/refundApplication/get';
    /*我的故障申报*/
    this.complainImgUrl = this.appUrl + '/complainImg/';
    this.tblCustomerMyDeclaration  = this.appUrl + '/tblCustomerComplain/myDeclaration';
    this.tblCustomerComplainReplyIsReplyUrl  = this.appUrl + '/complainReply/isReply';
    this.tblCustomerComplainReplyAddUrl  = this.appUrl + '/complainReply/add';
  }
}
