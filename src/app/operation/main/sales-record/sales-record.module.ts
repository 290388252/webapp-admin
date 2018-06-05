import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRecordRoutingModule } from './sales-record-routing.module';
import {SalesRecordComponent} from './sales-record.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SalesRecordRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AppService, AppProperties],
  declarations: [SalesRecordComponent]
})
export class SalesRecordModule { }
