import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {isCombinedNodeFlagSet} from "tslint";

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './mapResult.component.html',
  styleUrls: ['./mapResult.component.css']
})
export class MapResultComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  // get
  public vmCode;
  public vmVersion;
  public detailsList;
  public imageUrl = this.appProperties.shopImgUrl;
  public address;
  public vmState;
  public vmError;
  public token;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    // this.getVmDetails();
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取机器地址详情
   */
  getVmDetails() {
    if (this.vmVersion === '1') {
      this.appService.getAliData(this.appProperties.mapDetailsAUrl, {'vmCode': this.vmCode}, this.token).subscribe(
        data => {
          console.log('123');
          console.log(data);
          if (data.status === 1) {
            this.address = data.returnObject[0]['locatoinName'];
            this.vmState = data.returnObject[0]['stateName'];
            this.detailsList = data.returnObject;
            this.vmError = false;
          } else if(data.status === 0) {
            this.vmError = true;
            this.vmState = data.message;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.vmVersion === '2') {
      this.appService.getAliData(this.appProperties.mapDetailsBUrl, {'vmCode': this.vmCode}, this.token).subscribe(
        data => {
          console.log('123');
          console.log(data);
          if (data.status === 1) {
            this.detailsList = data.returnObject;
            this.vmError = false;
          } else if(data.status === 0) {
            this.vmError = true;
            this.vmState = data.message;
          }
        },
        error => {
          console.log(error);
        }
      );
    }

  }


}
