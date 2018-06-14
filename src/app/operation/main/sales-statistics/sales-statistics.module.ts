import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesStatisticsRoutingModule } from './sales-statistics-routing.module';
import {SalesStatisticsComponent} from './sales-statistics.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SalesStatisticsRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AppService, AppProperties],
  declarations: [SalesStatisticsComponent]
})
export class SalesStatisticsModule { }
