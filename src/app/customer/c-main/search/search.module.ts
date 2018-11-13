import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
// import {WeUiModule} from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    // WeUiModule.forRoot(),
    SearchRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [SearchComponent]
})
export class SearchModule { }
