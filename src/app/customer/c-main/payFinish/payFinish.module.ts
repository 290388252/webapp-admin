import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayFinishRoutingModule } from './payFinish-routing.module';
import {PayFinishComponent} from './payFinish.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    PayFinishRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [PayFinishComponent]
})
export class PayFinishModule { }
