import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRecordRoutingModule } from './sales-record-routing.module';
import {SalesRecordComponent} from './sales-record.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SalesRecordRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [SalesRecordComponent]
})
export class SalesRecordModule { }
