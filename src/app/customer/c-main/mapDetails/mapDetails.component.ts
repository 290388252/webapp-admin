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
    console.log(this.vmVersion);
    // this.token = getToken();
    this.getVmDetails();
  }


  getVmDetails() {
    if (this.vmVersion === '1') {
      this.appService.getData(this.appProperties.mapDetailsAUrl, {'vmCode': this.vmCode}).subscribe(
        data => {
          console.log('1');
          console.log(data);
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
          console.log('2');
          console.log(data);
          // console.log(data.returnObject.wayList);
          if (data.status === 1) {
            this.address = data.returnObject['locationName'];
            this.vmState = data.returnObject['stateName'];
            console.log(data.returnObject['locationName']);
            const wayList = data.returnObject.wayList;
            console.log(wayList[0].itemList[0]);
            let allList = [];
            for (let i = 0; i < wayList.length; i++) {
              console.log(wayList[i].itemList.length);
              for (let j = 0; j < wayList[i].itemList.length; j++) {
                allList.push(wayList[i].itemList[j]);
              }
            }
            console.log(allList);
            this.detailsList = allList;
            // console.log(data.returnObject.wayList);
            // this.detailsList = data.returnObject;
            // console.log(data.returnObject.wayList);
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
