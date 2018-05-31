import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from './login.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
