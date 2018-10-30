import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { MapDetailsRoutingModule } from './mapDetails-routing.module';
import {MapDetailsComponent} from './mapDetails.component';
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
    MapDetailsRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MapDetailsComponent]
})
export class MapDetailsModule { }
