import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ElModule } from 'element-angular';
// import { WeUiModule } from 'ngx-weui';
// if you use webpack, import style
// import 'element-angular/theme/index.css';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
//  注册语言包
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgZorroAntdModule.forRoot(),
    // ElModule.forRoot(),
    // WeUiModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
