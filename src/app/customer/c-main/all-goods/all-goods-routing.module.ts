import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllGoodsComponent} from './all-goods.component';

const routes: Routes = [
  {
    path: '', component: AllGoodsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllGoodsRoutingModule { }
