import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplenishmentDetailRoutingModule } from './replenishment-detail-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReplenishmentDetailComponent} from './replenishment-detail.component';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReplenishmentDetailService} from './replenishment-detail-service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReplenishmentDetailRoutingModule
  ],
  providers: [AppService, AppProperties, {provide: 'replenishment',  useClass: ReplenishmentDetailService}],
  declarations: [ReplenishmentDetailComponent]
})
export class ReplenishmentDetailModule { }
