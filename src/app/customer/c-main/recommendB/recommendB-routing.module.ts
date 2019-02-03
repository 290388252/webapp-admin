import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecommendBComponent} from './recommendB.component';

const routes: Routes = [
  {
    path: '', component: RecommendBComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendBRoutingModule { }
