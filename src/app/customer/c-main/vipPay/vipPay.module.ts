import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { VipPayRoutingModule } from './vipPay-routing.module';
import {VipPayComponent} from './vipPay.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    // ElModule,
    VipPayRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [VipPayComponent]
})
export class VipPayModule { }
