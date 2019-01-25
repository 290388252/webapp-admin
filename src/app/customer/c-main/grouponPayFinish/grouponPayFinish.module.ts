import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { GrouponPayFinishRoutingModule } from './grouponPayFinish-routing.module';
import {GrouponPayFinishComponent} from './grouponPayFinish.component';
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
    GrouponPayFinishRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [GrouponPayFinishComponent]
})
export class GrouponPayFinishModule { }
