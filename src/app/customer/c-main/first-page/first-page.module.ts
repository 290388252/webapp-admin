import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { FirstPageRoutingModule } from './first-page-routing.module';
import {FirstPageComponent} from './first-page.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ElModule,
    FirstPageRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [FirstPageComponent]
})
export class FirstPageModule { }
