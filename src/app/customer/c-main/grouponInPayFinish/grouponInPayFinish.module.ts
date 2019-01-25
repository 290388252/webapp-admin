import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { GrouponInPayFinishRoutingModule } from './grouponInPayFinish-routing.module';
import {GrouponInPayFinishComponent} from './grouponInPayFinish.component';
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
    GrouponInPayFinishRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [GrouponInPayFinishComponent]
})
export class GrouponInPayFinishModule { }
