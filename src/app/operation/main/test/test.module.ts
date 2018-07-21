import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import {TestComponent} from './test.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    TestRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [AppService, AppProperties],
  declarations: [TestComponent]
})
export class TestModule { }
