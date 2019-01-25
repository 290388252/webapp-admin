import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrouponPayFinishComponent} from './grouponPayFinish.component';

const routes: Routes = [
  {
    path: '', component: GrouponPayFinishComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrouponPayFinishRoutingModule { }
