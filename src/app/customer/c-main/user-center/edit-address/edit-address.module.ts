import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { EditAddressRoutingModule } from './edit-address-routing.module';
import {EditAddressComponent} from './edit-address.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { WeUiModule, ButtonConfig } from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    // ElModule,
    // WeUiModule.forRoot(),
    EditAddressRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [EditAddressComponent]
})

export class EditAddressModule { }
