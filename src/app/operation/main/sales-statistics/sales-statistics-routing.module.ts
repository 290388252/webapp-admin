import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SalesStatisticsComponent} from './sales-statistics.component';

const routes: Routes = [
  {
    path: '', component: SalesStatisticsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesStatisticsRoutingModule { }
