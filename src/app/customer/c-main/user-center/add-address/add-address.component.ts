import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  public isChoose: boolean;
  public lastConfirm: boolean;
  public text: string;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
  }
  onChecked() {
    if (document.getElementsByName('s1').item(0)['checked']) {
      this.text = '选中啦';
    } else {
      this.text = '选中个屁';
    }
  }
  ok() {
    this.lastConfirm = true;
    this.text = '填好了';
  }
  pick() {
    this.isChoose = true;
  }
  cancel() {
    this.isChoose = false;
  }
  confirm() {
    this.isChoose = false;
  }
  cancelContent() {
    this.lastConfirm = false;
  }
  confirmContent() {
    this.lastConfirm = false;
  }
}
