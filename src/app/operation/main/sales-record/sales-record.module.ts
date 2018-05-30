import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRecordRoutingModule } from './sales-record-routing.module';
import {SalesRecordComponent} from './sales-record.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SalesRecordRoutingModule
  ],
  declarations: [SalesRecordComponent]
})
export class SalesRecordModule { }
