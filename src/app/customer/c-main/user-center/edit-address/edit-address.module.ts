import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { EditAddressRoutingModule } from './edit-address-routing.module';
import {EditAddressComponent} from './edit-address.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
// import { WeUiModule, ButtonConfig } from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    // WeUiModule.forRoot(),
    EditAddressRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [EditAddressComponent]
})

export class EditAddressModule { }
