import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplenishmentDetailRoutingModule } from './replenishment-detail-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReplenishmentDetailComponent} from './replenishment-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReplenishmentDetailRoutingModule
  ],
  declarations: [ReplenishmentDetailComponent]
})
export class ReplenishmentDetailModule { }
