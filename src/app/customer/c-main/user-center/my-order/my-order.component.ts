import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  public list;
  public imgUrl = this.appProperties.shopImgUrl;
  public all: boolean;
  public noOrder: boolean;
  public order: boolean;
  public token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1MzA2OTU0MDZ9.ZqlidKJd5XbEEbPVVFbu2HfG1_etZzr5jRISx5-LtU9n6HK5z73Lo-x_O3mKM0dA_yGVrM9iOdkQlAF5YsxCyg';
  constructor(private appProperties: AppProperties) { }

  ngOnInit() {
    console.log(this.list);
    this.all = false;
    this.noOrder = true;
    this.order = true;
  }
  sort(flag) {
    if (flag === 1) {
      this.all = false;
      this.noOrder = true;
      this.order = true;
    } else if (flag === 2) {
      this.all = true;
      this.noOrder = false;
      this.order = true;
    } else if (flag === 3) {
      this.all = true;
      this.noOrder = true;
      this.order = false;
    }
  }
}
