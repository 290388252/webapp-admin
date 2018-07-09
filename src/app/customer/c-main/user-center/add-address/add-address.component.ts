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
  public text: number;
  public receiver: string;
  public name: string;
  public phone: string;
  public token: string;
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
    this.token = getToken();
  }
  onChecked() {
    if (document.getElementsByName('s1').item(0)['checked']) {
      this.text = 1;
    } else {
      this.text = 2;
    }
  }
  ok() {
    this.lastConfirm = true;
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
    this.appService.postAliData(this.appProperties.shopAddressAddUrl, {
      receiver: this.receiver,
      name: this.name,
      phone: this.phone,
      defaultFlag: this.text,
    }, this.token).subscribe(
      data => {
        console.log(data);
        if  (data.status === 1) {
          this.router.navigate(['cMain/shopCar']);
        }
        this.lastConfirm = false;
      },
      error => {
        console.log(error);
      }
    );
  }
}
