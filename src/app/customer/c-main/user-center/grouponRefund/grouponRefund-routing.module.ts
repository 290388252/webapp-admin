import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrouponRefundComponent} from './grouponRefund.component';

const routes: Routes = [
  {
    path: '', component: GrouponRefundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrouponRefundRoutingModule { }
