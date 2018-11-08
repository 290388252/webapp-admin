import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PayFinishComponent} from './payFinish.component';

const routes: Routes = [
  {
    path: '', component: PayFinishComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayFinishRoutingModule { }
