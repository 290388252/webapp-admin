import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrouponOrderComponent} from './grouponOrder.component';

const routes: Routes = [
  {
    path: '', component: GrouponOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrouponOrderRoutingModule { }
