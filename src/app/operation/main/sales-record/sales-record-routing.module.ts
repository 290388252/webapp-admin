import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SalesRecordComponent} from './sales-record.component';

const routes: Routes = [
  {
    path: '', component: SalesRecordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRecordRoutingModule { }
