import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CMainRoutingModule } from './c-main-routing.module';
import {CMainComponent} from './c-main.component';

@NgModule({
  imports: [
    CommonModule,
    CMainRoutingModule
  ],
  declarations: [CMainComponent]
})
export class CMainModule { }
