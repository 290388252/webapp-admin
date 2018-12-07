import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyDeclarationComponent} from './myDeclaration.component';

const routes: Routes = [
  {
    path: '', component: MyDeclarationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDeclarationRoutingModule { }
