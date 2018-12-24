import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BargainComponent} from './bargain.component';

const routes: Routes = [
  {
    path: '', component: BargainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BargainRoutingModule { }
