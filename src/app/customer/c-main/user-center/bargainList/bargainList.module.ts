import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { BargainListRoutingModule } from './bargainList-routing.module';
import {BargainListComponent} from './bargainList.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    FileUploadModule,
    FormsModule,
    BargainListRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [BargainListComponent]
})
export class BargainListModule { }
