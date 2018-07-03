import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {AllGoodsService} from "./all-goods-service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.css']
})
export class AllGoodsComponent implements OnInit {
  array = [
    'http://119.23.233.123:6662/ys_admin/files/0.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000080.png',
    'http://119.23.233.123:6662/ys_admin/qrCode/1988000081.png',
    'http://119.23.233.123:6662/ys_admin/files/0.png'
  ];
  public list;
  public token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1MzA1OTM3NjV9.hSXgewV6P2RODNoP2DdeeR83b4kHjzafOzoUlg63ITvhuCUuzqT3fTfFdS14qfABzdMDgDdzJ4xj4EyUrQewnA';
  constructor(@Inject('showAllGoods') private allGoodsService) { }

  ngOnInit() {
    this.list = this.allGoodsService.showGoods(this.token);
    console.log(this.list);
  }
}
