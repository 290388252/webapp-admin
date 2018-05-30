import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReplenishmentDetailComponent} from './replenishment-detail.component';

const routes: Routes = [
  {
    path: '', component: ReplenishmentDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplenishmentDetailRoutingModule { }
