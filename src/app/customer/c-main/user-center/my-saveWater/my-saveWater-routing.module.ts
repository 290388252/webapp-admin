import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MySaveWaterComponent} from './my-saveWater.component';

const routes: Routes = [
  {
    path: '', component: MySaveWaterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySaveWaterRoutingModule { }
