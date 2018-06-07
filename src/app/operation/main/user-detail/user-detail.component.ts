import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public machinesNum: number;
  public replenishNum: number;
  public troubleNum: number;
  public sumNum: number;
  public sumPrice: number;

  constructor( private appProperties: AppProperties,
               private appService: AppService) { }

  ngOnInit() {
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 3);
      document.cookie = 'adminToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    }
    console.log(getToken());
    this.appService.postAliData(this.appProperties.mainInfoUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        this.machinesNum = data.returnObject.machinesNum;
        this.replenishNum = data.returnObject.replenishNum;
        this.troubleNum = data.returnObject.troubleNum;
        if (data.returnObject.sumPayRecordDto.sumNum === '') {
          this.sumNum = 0;
        } else {
          this.sumNum = data.returnObject.sumPayRecordDto.sumNum;
        }
        if (data.returnObject.sumPayRecordDto.sumPrice === '') {
          this.sumPrice = 0;
        } else {
          this.sumPrice = data.returnObject.sumPayRecordDto.sumPrice;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
