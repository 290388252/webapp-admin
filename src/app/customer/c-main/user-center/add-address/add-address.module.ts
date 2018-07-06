import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { AddAddressRoutingModule } from './add-address-routing.module';
import {AddAddressComponent} from './add-address.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    FormsModule,
    ReactiveFormsModule,
    AddAddressRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [AddAddressComponent]
})

export class AddAddressModule { }
