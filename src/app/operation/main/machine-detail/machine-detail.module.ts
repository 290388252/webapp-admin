import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineDetailRoutingModule } from './machine-detail-routing.module';
import {MachineDetailComponent} from './machine-detail.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MachineDetailRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [AppService, AppProperties],
  declarations: [MachineDetailComponent]
})
export class MachineDetailModule { }
