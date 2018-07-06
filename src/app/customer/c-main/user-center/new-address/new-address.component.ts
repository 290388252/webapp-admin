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
  private token;
  public list = [];
  constructor( private appProperties: AppProperties,
               private appService: AppService,
               private router: Router) { }

  ngOnInit() {
    this.token = getToken();
    this.appService.postAliData(this.appProperties.shopAddressSelectUrl, '', this.token).subscribe(
      data => {
        console.log(data);
        data.returnObject === null ? this.emptyAddress = true : this.emptyAddress = false;
        if (!this.emptyAddress) {
          this.list = data.returnObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  addAddress() {
    this.router.navigate(['cMain/addAddress']);
  }
  onChecked() {
    if (document.getElementsByName('s1').item(0)['checked']) {
    } else {
    }
  }
  ok(id) {
    this.router.navigate(['cMain/editAddress'], {
      queryParams: {
        id: id
      }});
  }
}
