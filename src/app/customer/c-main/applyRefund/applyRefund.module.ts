import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { ApplyRefundRoutingModule } from './applyRefund-routing.module';
import {ApplyRefundComponent} from './applyRefund.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    FormsModule,
    ReactiveFormsModule,
    ApplyRefundRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [ApplyRefundComponent]
})
export class ApplyRefundModule { }
