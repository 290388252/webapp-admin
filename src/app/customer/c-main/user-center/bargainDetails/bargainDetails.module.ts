import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { BargainDetailsRoutingModule } from './bargainDetails-routing.module';
import {BargainDetailsComponent} from './bargainDetails.component';
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
    BargainDetailsRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [BargainDetailsComponent]
})
export class BargainDetailsModule { }
