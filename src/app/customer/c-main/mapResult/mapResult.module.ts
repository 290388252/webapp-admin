import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { MapResultRoutingModule } from './mapResult-routing.module';
import {MapResultComponent} from './mapResult.component';
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
    MapResultRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MapResultComponent]
})
export class MapResultModule { }
