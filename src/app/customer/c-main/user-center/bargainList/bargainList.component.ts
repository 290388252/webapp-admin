import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import { ElementRef} from '@angular/core';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './bargainList.component.html',
  styleUrls: ['./bargainList.component.css']
})
export class BargainListComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public orderId;
  //
  public isFocusA;
  public isFocusB;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService, private el: ElementRef) {
  }

  ngOnInit() {
    this.token = getToken();
  }
  goTo() {
    this.router.navigate(['user'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }
  to() {
  }
}
