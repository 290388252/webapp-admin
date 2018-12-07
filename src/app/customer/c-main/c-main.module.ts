import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CMainRoutingModule } from './c-main-routing.module';
import {CMainComponent} from './c-main.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
// import { ElModule } from 'element-angular';
// import { WeUiModule } from 'ngx-weui';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    CMainRoutingModule,
    NgZorroAntdModule.forRoot(),
    // ElModule.forRoot(),
    // WeUiModule.forRoot(),
  ],
  providers: [AppService, AppProperties],
  declarations: [CMainComponent]
})
export class CMainModule { }
