import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  public lastConfirm: boolean;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
  }
  addAddress() {
    this.router.navigate(['cMain/addAddress']);
  }
  delete() {
    this.lastConfirm = true;
  }
  cancelContent() {
    this.lastConfirm = false;
  }
  confirmContent() {
    this.lastConfirm = false;
  }
}
