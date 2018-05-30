import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineDetailRoutingModule } from './machine-detail-routing.module';
import {MachineDetailComponent} from './machine-detail.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MachineDetailRoutingModule
  ],
  declarations: [MachineDetailComponent]
})
export class MachineDetailModule { }
