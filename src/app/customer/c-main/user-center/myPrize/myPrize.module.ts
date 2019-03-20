import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import {MyPrizeRoutingModule} from './myPrize-routing.module';
import {MyPrizeComponent} from './myPrize.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    MyPrizeRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MyPrizeComponent]
})
export class MyPrizeModule { }
