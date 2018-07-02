import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { UserCenterRoutingModule } from './user-center-routing.module';
import {UserCenterComponent} from './user-center.component';
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
    UserCenterRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [UserCenterComponent]
})
export class UserCenterModule { }
