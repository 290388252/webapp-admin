import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { ShopCarRoutingModule } from './shop-car-routing.module';
import {ShopCarComponent} from './shop-car.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    ShopCarRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [ShopCarComponent]
})
export class ShopCarModule { }
