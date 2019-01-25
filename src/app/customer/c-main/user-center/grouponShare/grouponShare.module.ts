import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { GrouponShareRoutingModule } from './grouponShare-routing.module';
import {GrouponShareComponent} from './grouponShare.component';
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
    GrouponShareRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [GrouponShareComponent]
})
export class GrouponShareModule { }
