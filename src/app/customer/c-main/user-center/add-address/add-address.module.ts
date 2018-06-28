import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { AddAddressRoutingModule } from './add-address-routing.module';
import {AddAddressComponent} from './add-address.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import { WeUiModule, ButtonConfig } from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ElModule,
    WeUiModule.forRoot(),
    AddAddressRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [AddAddressComponent]
})

export class AddAddressModule { }
