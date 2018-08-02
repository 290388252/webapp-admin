import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { WaterRecordComponent} from './waterRecord.component';
import { WaterRecordRoutingModule} from './waterRecord-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    WaterRecordRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [WaterRecordComponent]
})
export class WaterRecordModule { }
