import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import {UserDetailComponent} from './user-detail.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    UserDetailRoutingModule
  ],
  declarations: [UserDetailComponent]
})
export class UserDetailModule { }
