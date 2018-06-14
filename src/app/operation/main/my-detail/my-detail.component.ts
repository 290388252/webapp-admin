import { Component, OnInit } from '@angular/core';
import {getToken, urlParse} from '../../../utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-sales-record',
  templateUrl: './my-detail.component.html',
  styleUrls: ['./my-detail.component.css']
})
export class MyDetailComponent implements OnInit {
  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }
  ngOnInit() {}
}
