import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { RecommendRoutingModule } from './recommend-routing.module';
import {RecommendComponent} from './recommend.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {RecommendService} from './recommend-service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    RecommendRoutingModule
  ],
  providers: [AppService, AppProperties, {provide: 'showRecommend', useClass: RecommendService}],
  declarations: [RecommendComponent]
})
export class RecommendModule { }
