import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VipCarComponent} from './vipCar.component';

const routes: Routes = [
  {
    path: '', component: VipCarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VipCarRoutingModule { }
