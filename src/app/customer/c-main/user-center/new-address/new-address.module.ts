import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElModule } from 'element-angular';
import { NewAddressRoutingModule } from './new-address-routing.module';
import {NewAddressComponent} from './new-address.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ElModule,
    NewAddressRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [NewAddressComponent]
})
export class NewAddressModule { }
