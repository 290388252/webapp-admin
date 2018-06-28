import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditAddressComponent} from './edit-address.component';

const routes: Routes = [
  {
    path: '', component: EditAddressComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAddressRoutingModule { }
