import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopCarComponent} from './shop-car.component';

const routes: Routes = [
  {
    path: '', component: ShopCarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopCarRoutingModule { }
