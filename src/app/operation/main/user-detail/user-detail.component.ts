import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getAdminToken, getToken, urlParse} from '../../../utils/util';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public machinesNum: any;
  public replenishNum: any;
  public troubleNum: any;
  public sumNum: any;
  public sumPrice: any;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    if (urlParse(window.location.search)['token'] !== undefined
      && urlParse(window.location.search)['token'] !== '') {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 3);
      document.cookie = 'adminToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    }
    this.appService.postAliData(this.appProperties.mainInfoUrl, '', getAdminToken()).subscribe(
      data => {
        if (data.status === 1) {
          this.machinesNum = data.returnObject.machinesNum;
          this.replenishNum = data.returnObject.replenishNum;
          this.troubleNum = data.returnObject.troubleNum;
          this.sumNum = data.returnObject.sumPayRecordDto.sumNum;
          if (data.returnObject.sumPayRecordDto.sumPrice === '' || data.returnObject.sumPayRecordDto.sumPrice === null) {
            this.sumPrice = 0;
          } else {
            this.sumPrice = data.returnObject.sumPayRecordDto.sumPrice;
          }
        } else if (data.status === 0) {
          this.sumNum = '***';
          this.sumPrice = '***';
          this.machinesNum = '***';
          this.replenishNum = data.returnObject.replenishNum;
          this.troubleNum = '***';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 跳转页面
   */
  left() {
    this.router.navigate(['main/replenishmentDetail']);
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 跳转页面
   */
  right() {
    if (this.machinesNum !== '***') {
      this.router.navigate(['main/machineDetail']);
    }
  }
}
