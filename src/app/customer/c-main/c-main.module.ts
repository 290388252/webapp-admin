import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CMainRoutingModule } from './c-main-routing.module';
import {CMainComponent} from './c-main.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { ElModule } from 'element-angular';
@NgModule({
  imports: [
    CommonModule,
    CMainRoutingModule,
    NgZorroAntdModule.forRoot(),
    ElModule.forRoot(),
  ],
  declarations: [CMainComponent]
})
export class CMainModule { }
