import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'salesRecord'},
      { path: 'userDetail', loadChildren: './user-detail/user-detail.module#UserDetailModule' },
      { path: 'salesRecord', loadChildren: './sales-record/sales-record.module#SalesRecordModule' },
      { path: 'machineDetail', loadChildren: './machine-detail/machine-detail.module#MachineDetailModule' },
      // { path: 'test', loadChildren: '../user-detail/user-detail.module#UserDetailModule' }
    ]
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
