import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { BargainDetailsShareRoutingModule } from './bargainDetailsShare-routing.module';
import {BargainDetailsShareComponent} from './bargainDetailsShare.component';
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
    BargainDetailsShareRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [BargainDetailsShareComponent]
})
export class BargainDetailsShareModule { }
