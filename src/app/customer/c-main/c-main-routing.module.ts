import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CMainComponent} from './c-main.component';

const routes: Routes = [
  {
    path: '',
    component: CMainComponent,
    children: [
      {path: '', redirectTo: 'firstPage'},
      {path: 'firstPage', loadChildren: './first-page/first-page.module#FirstPageModule'},
      {path: 'detail', loadChildren: './detail/detail.module#DetailModule'},
      {path: 'allGoods', loadChildren: './all-goods/all-goods.module#AllGoodsModule'},
      {path: 'shopCar', loadChildren: './shop-car/shop-car.module#ShopCarModule'},
      // {path: 'search', loadChildren: './search/search.module#SearchModule'},
      {path: 'pay', loadChildren: './pay/pay.module#PayModule'},
      {path: 'userCenter', loadChildren: './user-center/user-center.module#UserCenterModule'},
      {path: 'newAddress', loadChildren: './user-center/new-address/new-address.module#NewAddressModule'},
      {path: 'addAddress', loadChildren: './user-center/add-address/add-address.module#AddAddressModule'},
      {path: 'editAddress', loadChildren: './user-center/edit-address/edit-address.module#EditAddressModule'},
      {path: 'coupon', loadChildren: './user-center/coupon/coupon.module#CouponModule'},
      {path: 'prepaid', loadChildren: './prepaid/prepaid.module#PrepaidModule'},
      {path: 'myOrder', loadChildren: './user-center/my-order/my-order.module#MyOrderModule'},
      {path: 'mySaveWater', loadChildren: './user-center/my-saveWater/my-saveWater.module#MySaveWaterModule'},
      {path: 'waterRecord', loadChildren: './waterRecord/waterRecord.module#WaterRecordModule'},
      {path: 'vipCar', loadChildren: './vipCar/vipCar.module#VipCarModule'},
      {path: 'vipPay', loadChildren: './vipPay/vipPay.module#VipPayModule'},
      {path: 'cardMap', loadChildren: './cardMap/map.module#MapModule'},
      {path: 'prepaidPay', loadChildren: './prepaidPay/prepaidPay.module#PrepaidPayModule'},
      {path: 'grouponPay', loadChildren: './grouponPay/grouponPay.module#GrouponPayModule'},
      {path: 'mapDetails', loadChildren: './mapDetails/mapDetails.module#MapDetailsModule'},
      {path: 'mapList', loadChildren: './mapList/mapList.module#MapListModule' },
      {path: 'payFinish', loadChildren: './payFinish/payFinish.module#PayFinishModule' },
      {path: 'promotions', loadChildren: './promotions/promotions.module#PromotionsModule' },
      {path: 'waterCoupon', loadChildren: './user-center/waterCoupon/waterCoupon.module#WaterCouponModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMainRoutingModule {
}
