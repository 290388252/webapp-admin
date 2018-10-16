import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrepaidPayComponent} from './prepaidPay.component';

const routes: Routes = [
  {
    path: '', component: PrepaidPayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepaidPayRoutingModule { }
