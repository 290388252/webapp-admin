import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyPrizeComponent} from './myPrize.component';

const routes: Routes = [
  {
    path: '', component: MyPrizeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPrizeRoutingModule { }
