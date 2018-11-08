import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { PromotionsRoutingModule } from './promotions-routing.module';
import {PromotionsComponent} from './promotions.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    // ElModule,
    PromotionsRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [PromotionsComponent]
})
export class PromotionsModule { }
