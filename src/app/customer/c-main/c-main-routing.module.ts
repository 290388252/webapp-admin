import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CMainComponent} from './c-main.component';

const routes: Routes = [
  {
    path: '',
    component: CMainComponent,
    children: [
      { path: '', redirectTo: 'firstPage'},
      { path: 'firstPage', loadChildren: './first-page/first-page.module#FirstPageModule' },
      { path: 'allGoods', loadChildren: './all-goods/all-goods.module#AllGoodsModule' },
      { path: 'shopCar', loadChildren: './shop-car/shop-car.module#ShopCarModule' },
      { path: 'userCenter', loadChildren: './user-center/user-center.module#UserCenterModule' },
      { path: 'newAddress', loadChildren: './user-center/new-address/new-address.module#NewAddressModule' },
      { path: 'addAddress', loadChildren: './user-center/add-address/add-address.module#AddAddressModule' },
      { path: 'editAddress', loadChildren: './user-center/edit-address/edit-address.module#EditAddressModule' },
      { path: 'coupon', loadChildren: './user-center/coupon/coupon.module#CouponModule' },
      { path: 'myOrder', loadChildren: './user-center/my-order/my-order.module#MyOrderModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMainRoutingModule { }
