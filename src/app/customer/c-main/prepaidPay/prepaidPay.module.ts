import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { PrepaidPayRoutingModule } from './prepaidPay-routing.module';
import {PrepaidPayComponent} from './prepaidPay.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    FormsModule,
    PrepaidPayRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [PrepaidPayComponent]
})
export class PrepaidPayModule { }
