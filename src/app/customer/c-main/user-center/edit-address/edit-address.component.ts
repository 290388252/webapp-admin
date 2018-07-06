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
  public name: string;
  public phone: string;
  public receiver: string;
  private token;
  private id;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
    this.id = urlParse(window.location.href)['id'];
    this.token = getToken();
    this.appService.postAliData(this.appProperties.shopAddressSelectUrl, '', this.token).subscribe(
      data => {
        console.log(data);
        data.returnObject.forEach(item => {
          if (item.id === Number.parseInt(this.id)) {
            this.name = item.name;
            this.phone = item.phone;
            this.receiver = item.receiver;
          }
        });
      },
      error => {
        console.log(error);
      }
    );
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
    console.log('?');
    this.appService.postAliData(this.appProperties.shopAddressUpdateUrl, {
      id: this.id,
      deleteFlag: 1
    }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.lastConfirm = false;
          this.router.navigate(['cMain/newAddress']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
