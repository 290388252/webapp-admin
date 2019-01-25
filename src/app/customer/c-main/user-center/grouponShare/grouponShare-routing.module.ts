import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrouponShareComponent} from './grouponShare.component';

const routes: Routes = [
  {
    path: '', component: GrouponShareComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrouponShareRoutingModule { }
