import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyDetailComponent} from './my-detail.component';

const routes: Routes = [
  {
    path: '', component: MyDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDetailRoutingModule { }
