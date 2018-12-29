import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BargainDetailsShareComponent} from './bargainDetailsShare.component';

const routes: Routes = [
  {
    path: '', component: BargainDetailsShareComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BargainDetailsShareRoutingModule { }
