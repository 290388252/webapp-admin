import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapResultComponent} from './mapResult.component';

const routes: Routes = [
  {
    path: '', component: MapResultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapResultRoutingModule { }
