import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrepaidComponent} from './prepaid.component';

const routes: Routes = [
  {
    path: '', component: PrepaidComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepaidRoutingModule { }
