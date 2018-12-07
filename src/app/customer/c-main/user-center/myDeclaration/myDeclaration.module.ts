import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDeclarationRoutingModule } from './myDeclaration-routing.module';
import {MyDeclarationComponent} from './myDeclaration.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MyDeclarationRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MyDeclarationComponent]
})
export class MyDeclarationModule { }
