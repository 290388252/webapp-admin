import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { GrouponPayRoutingModule } from './grouponPay-routing.module';
import {GrouponPayComponent} from './grouponPay.component';
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
    GrouponPayRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [GrouponPayComponent]
})
export class GrouponPayModule { }
