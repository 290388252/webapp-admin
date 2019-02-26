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
  /**
   * 2019-02-15
   * @author maiziyao
   * 新增地址
   */
  addAddress() {
    this.router.navigate(['cMain/addAddress']);
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 删除地址
   */
  delete() {
    this.lastConfirm = true;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 是否确认删除地址弹框
   */
  cancelContent() {
    this.lastConfirm = false;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 二次确认删除地址
   */
  confirmContent() {
    this.appService.postAliData(this.appProperties.shopAddressUpdateUrl, {
      id: this.id,
      deleteFlag: 1
    }, this.token).subscribe(
      data => {
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
