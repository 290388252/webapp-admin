import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import {UserDetailComponent} from './user-detail.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    UserDetailRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [UserDetailComponent]
})
export class UserDetailModule { }
