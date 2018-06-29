import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {
  array = [
    'http://119.23.233.123:6662/ys_admin/files/0.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000080.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000081.png',
    'http://119.23.233.123:6662/ys_admin/files/0.png'
  ];
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
  }
  detail(flag) {
    if (flag === 1) {
      // this.router.navigate(['cMain/newAddress']);
    } else if (flag === 2) {
      this.router.navigate(['cMain/coupon']);
    } else if (flag === 3) {
      // this.router.navigate(['cMain/newAddress']);
    } else if (flag === 4) {
      this.router.navigate(['cMain/newAddress']);
    } else if (flag === 5) {
      // this.router.navigate(['cMain/newAddress']);
    }
  }
}
