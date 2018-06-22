import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CLoginRoutingModule } from './c-login-routing.module';
import {CLoginComponent} from './c-login.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {CLoginService} from './c-login-service';

@NgModule({
  declarations: [CLoginComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot(),
    CLoginRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [ CLoginComponent ],
  providers: [AppService, AppProperties, {provide: 'cLogin',  useClass: CLoginService}],
})
export class CLoginModule { }
