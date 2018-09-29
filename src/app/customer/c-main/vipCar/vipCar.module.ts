import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { VipCarRoutingModule } from './vipCar-routing.module';
import {VipCarComponent} from './vipCar.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    VipCarRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [VipCarComponent]
})
export class VipCarModule { }
