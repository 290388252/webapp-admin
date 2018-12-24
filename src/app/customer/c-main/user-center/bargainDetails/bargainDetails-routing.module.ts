import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BargainDetailsComponent} from './bargainDetails.component';

const routes: Routes = [
  {
    path: '', component: BargainDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BargainDetailsRoutingModule { }
