import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { PrepaidRoutingModule } from './prepaid-routing.module';
import {PrepaidComponent} from './prepaid.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    PrepaidRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [PrepaidComponent]
})
export class PrepaidModule { }
