import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { MapListRoutingModule } from './mapList-routing.module';
import {MapListComponent} from './mapList.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    // ElModule,
    MapListRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MapListComponent]
})
export class MapListModule { }
