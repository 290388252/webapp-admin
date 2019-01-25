import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { GrouponRefundRoutingModule } from './grouponRefund-routing.module';
import {GrouponRefundComponent} from './grouponRefund.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    // ElModule,
    GrouponRefundRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [GrouponRefundComponent]
})
export class GrouponRefundModule { }
