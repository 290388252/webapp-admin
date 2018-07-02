import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { CouponRoutingModule } from './coupon-routing.module';
import {CouponComponent} from './coupon.component';
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
    CouponRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [CouponComponent]
})

export class CouponModule { }
