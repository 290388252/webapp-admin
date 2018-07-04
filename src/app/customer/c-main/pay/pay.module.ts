import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { PayRoutingModule } from './pay-routing.module';
import {PayComponent} from './pay.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    PayRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [PayComponent]
})
export class PayModule { }
