import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { GrouponOrderRoutingModule } from './grouponOrder-routing.module';
import {GrouponOrderComponent} from './grouponOrder.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    FormsModule,
    ReactiveFormsModule,
    GrouponOrderRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [GrouponOrderComponent]
})
export class GrouponOrderModule { }
