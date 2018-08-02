import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WaterRecordComponent} from './waterRecord.component';

const routes: Routes = [
  {
    path: '', component: WaterRecordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterRecordRoutingModule { }
