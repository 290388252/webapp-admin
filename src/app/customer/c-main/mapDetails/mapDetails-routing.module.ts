import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapDetailsComponent} from './mapDetails.component';

const routes: Routes = [
  {
    path: '', component: MapDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapDetailsRoutingModule { }
