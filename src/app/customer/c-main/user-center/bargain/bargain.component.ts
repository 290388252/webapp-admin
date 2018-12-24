import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './bargain.component.html',
  styleUrls: ['./bargain.component.css']
})
export class BargainComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public orderId;
  //
  public isFocusA;
  public isFocusB;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    // this.userBalance = urlParse(window.location.href)['userBalance'];
    this.token = getToken();
  }
  goTo() {
    this.router.navigate(['cMain/bargainList'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }
  to() {
  }
}
