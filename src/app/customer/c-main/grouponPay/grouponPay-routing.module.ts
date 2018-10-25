import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrouponPayComponent} from './grouponPay.component';

const routes: Routes = [
  {
    path: '', component: GrouponPayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrouponPayRoutingModule { }
