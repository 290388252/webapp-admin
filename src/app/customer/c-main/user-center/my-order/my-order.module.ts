import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { MyOrderRoutingModule } from './my-order-routing.module';
import {MyOrderComponent} from './my-order.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    MyOrderRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MyOrderComponent]
})
export class MyOrderModule { }
