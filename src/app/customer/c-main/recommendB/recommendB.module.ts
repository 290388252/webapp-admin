import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { RecommendBRoutingModule } from './recommendB-routing.module';
import {RecommendBComponent} from './recommendB.component';
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
    RecommendBRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [RecommendBComponent]
})
export class RecommendBModule { }
