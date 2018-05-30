import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRecordRoutingModule } from './sales-record-routing.module';
import {SalesRecordComponent} from './sales-record.component';

@NgModule({
  imports: [
    CommonModule,
    SalesRecordRoutingModule
  ],
  declarations: [SalesRecordComponent]
})
export class SalesRecordModule { }
