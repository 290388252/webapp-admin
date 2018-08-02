import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import {MySaveWaterRoutingModule} from './my-saveWater-routing.module';
import {MySaveWaterComponent} from './my-saveWater.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    MySaveWaterRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MySaveWaterComponent]
})
export class MySaveWaterModule { }
