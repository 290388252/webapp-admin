import { Component, OnInit } from '@angular/core';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';

@Component({
  selector: 'app-sales-record',
  templateUrl: './sales-record.component.html',
  styleUrls: ['./sales-record.component.css']
})
export class SalesRecordComponent implements OnInit {

  public token;
  constructor(private router: Router,
              private appProperties: AppProperties,
              private appService: AppService) {}

  ngOnInit() {
    const exp = new Date();
    exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 3);
    document.cookie = 'adminToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
    console.log(getToken());
  }

}
