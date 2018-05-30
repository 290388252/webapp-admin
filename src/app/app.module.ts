import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

//  注册语言包
 import { registerLocaleData } from '@angular/common';
 import zh from '@angular/common/l;
import { ReplenishmentDetailComponent } from './operation/main/replenishment-detail/replenishment-detail.component'ocales/zh';
 registerLocaleData(zh);

@NgModule({
  declarations: [
    Ap,
    ReplenishmentDetailComponentpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
