import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDetailRoutingModule } from './my-detail-routing.module';
import {MyDetailComponent} from './my-detail.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MyDetailRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AppService, AppProperties],
  declarations: [MyDetailComponent]
})
export class MyDetailModule { }
