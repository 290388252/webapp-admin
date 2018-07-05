import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {
  public emptyAddress: boolean;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
    this.emptyAddress = false;
  }
  addAddress() {
    this.router.navigate(['cMain/addAddress']);
  }
  onChecked() {
    if (document.getElementsByName('s1').item(0)['checked']) {
    } else {
    }
  }
  ok() {
  }
}
