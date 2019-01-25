import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrouponDetailsComponent} from './grouponDetails.component';

const routes: Routes = [
  {
    path: '', component: GrouponDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrouponDetailsRoutingModule { }
