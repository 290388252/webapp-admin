import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
      CouponRoutingModule,
        NgZorroAntdModule,
      FormsModule,
    ],
    declarations: [CouponComponent],
    providers: [AppService, AppProperties]
})
export class CouponModule {}
