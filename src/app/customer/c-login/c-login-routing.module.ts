import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CLoginComponent} from './c-login.component';

const routes: Routes = [
  {
    path: '', component: CLoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CLoginRoutingModule { }
