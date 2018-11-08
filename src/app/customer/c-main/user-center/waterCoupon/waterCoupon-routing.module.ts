import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WaterCouponComponent} from './waterCoupon.component';

const routes: Routes = [
  {
    path: '', component: WaterCouponComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterCouponRoutingModule { }
