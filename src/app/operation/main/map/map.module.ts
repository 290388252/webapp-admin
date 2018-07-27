import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import {MapComponent} from './map.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MapRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [AppService, AppProperties],
  declarations: [MapComponent]
})
export class MapModule { }
