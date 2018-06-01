import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplenishmentDetailRoutingModule } from './replenishment-detail-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReplenishmentDetailComponent} from './replenishment-detail.component';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReplenishmentDetailRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [ReplenishmentDetailComponent]
})
export class ReplenishmentDetailModule { }
