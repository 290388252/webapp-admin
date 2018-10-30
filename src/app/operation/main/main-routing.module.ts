import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'userDetail'},
      { path: 'salesRecord', loadChildren: './sales-record/sales-record.module#SalesRecordModule' },
      { path: 'userDetail', loadChildren: './user-detail/user-detail.module#UserDetailModule' },
      { path: 'map', loadChildren: './map/map.module#MapModule' },
      { path: 'centerMap', loadChildren: './map/map.module#MapModule' },
      { path: 'machineDetail', loadChildren: './machine-detail/machine-detail.module#MachineDetailModule' },
      { path: 'replenishmentDetail', loadChildren: './replenishment-detail/replenishment-detail.module#ReplenishmentDetailModule' },
      { path: 'salesStatistics', loadChildren: './sales-statistics/sales-statistics.module#SalesStatisticsModule' },
      { path: 'myDetail', loadChildren: './my-detail/my-detail.module#MyDetailModule' }

    ]
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
