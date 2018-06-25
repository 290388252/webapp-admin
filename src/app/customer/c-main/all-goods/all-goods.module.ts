import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { AllGoodsRoutingModule } from './all-goods-routing.module';
import {AllGoodsComponent} from './all-goods.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ElModule,
    AllGoodsRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [AllGoodsComponent]
})
export class AllGoodsModule { }
