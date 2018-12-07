import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProtocolComponent} from './protocol.component';

const routes: Routes = [
  {
    path: '', component: ProtocolComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtocolRoutingModule { }
