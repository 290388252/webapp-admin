import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VipPayComponent} from './vipPay.component';

const routes: Routes = [
  {
    path: '', component: VipPayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VipPayRoutingModule { }
