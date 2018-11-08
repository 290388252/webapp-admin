import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { WaterCouponRoutingModule } from './waterCoupon-routing.module';
import {WaterCouponComponent} from './waterCoupon.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
// import { WeUiModule, ButtonConfig } from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    // WeUiModule.forRoot(),
    WaterCouponRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [WaterCouponComponent]
})

export class WaterCouponModule { }
