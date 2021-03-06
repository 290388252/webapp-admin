import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import { ElModule } from 'element-angular';
import {DetailRoutingModule} from './detail-routing.module';
import {DetailComponent} from './detail.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    DetailRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [DetailComponent]
})
export class DetailModule {
}

