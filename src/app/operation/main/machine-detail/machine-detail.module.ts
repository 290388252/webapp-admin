import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineDetailRoutingModule } from './machine-detail-routing.module';
import {MachineDetailComponent} from './machine-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MachineDetailRoutingModule
  ],
  declarations: [MachineDetailComponent]
})
export class MachineDetailModule { }
