import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit {
  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 返回充值页面
   */
  goTo(flag) {
    if (flag === 'prepaid') {
      window.location.href = 'http://webapp.youshuidaojia.com/cMain/prepaid?token=' + urlParse(window.location.href)['token'];
    }

  }
}
