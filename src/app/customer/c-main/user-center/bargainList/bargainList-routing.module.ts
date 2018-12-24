import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BargainListComponent} from './bargainList.component';

const routes: Routes = [
  {
    path: '', component: BargainListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BargainListRoutingModule { }
