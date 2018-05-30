import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'salesRecord'},
      { path: 'salesRecord', loadChildren: './sales-record/sales-record.module#SalesRecordModule' },
      { path: 'userDetail', loadChildren: './user-detail/user-detail.module#UserDetailModule' },
      { path: 'machineDetail', loadChildren: './machine-detail/machine-detail.module#MachineDetailModule' },
      { path: 'replenishmentDetail', loadChildren: './replenishment-detail/replenishment-detail.module#ReplenishmentDetailModule' }
    ]
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
