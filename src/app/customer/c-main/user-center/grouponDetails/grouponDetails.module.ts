import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { GrouponDetailsRoutingModule } from './grouponDetails-routing.module';
import {GrouponDetailsComponent} from './grouponDetails.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    // ElModule,
    GrouponDetailsRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [GrouponDetailsComponent]
})
export class GrouponDetailsModule { }
