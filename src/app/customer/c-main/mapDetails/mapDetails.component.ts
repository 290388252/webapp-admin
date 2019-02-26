import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {isCombinedNodeFlagSet} from 'tslint';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './mapDetails.component.html',
  styleUrls: ['./mapDetails.component.css']
})
export class MapDetailsComponent implements OnInit {
  public imgUrl = this.appProperties.filesImgUrl;
  // get
  public vmCode;
  public vmVersion;
  public detailsList;
  // public imageUrl = this.appProperties.shopImgUrl;
  public address;
  public vmState;
  public vmError;
  public token;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.vmCode = urlParse(window.location.href)['vmCode'];
    this.vmVersion = urlParse(window.location.href)['version'];
    // this.token = getToken();
    this.getVmDetails();
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取机器货道详情
   */
  getVmDetails() {
    if (this.vmVersion === '1') {
      this.appService.getData(this.appProperties.mapDetailsAUrl, {'vmCode': this.vmCode}).subscribe(
        data => {
          if (data.status === 1) {
            this.address = data.returnObject[0]['locatoinName'];
            this.vmState = data.returnObject[0]['stateName'];
            this.detailsList = data.returnObject;
            this.vmError = false;
          } else if (data.status === 0) {
            this.vmError = true;
            this.vmState = data.message;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.vmVersion === '2') {
      this.appService.getData(this.appProperties.mapDetailsBUrl, {'vmCode': this.vmCode}).subscribe(
        data => {
          if (data.status === 1) {
            this.address = data.returnObject['locationName'];
            this.vmState = data.returnObject['stateName'];
            const wayList = data.returnObject.wayList;
            let allList = [];
            for (let i = 0; i < wayList.length; i++) {
              for (let j = 0; j < wayList[i].itemList.length; j++) {
                allList.push(wayList[i].itemList[j]);
              }
            }
            this.detailsList = allList;
            this.vmError = false;
          } else if (data.status === 0) {
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
