import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './waterRecord.component.html',
  styleUrls: ['./waterRecord.component.css']
})
export class WaterRecordComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public empty: boolean;
  public token;
  public data;
  public id;
  public pic;
  public name;

  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router ) {
  }

  ngOnInit() {
    this.id = urlParse(window.location.href)['id'];
    this.pic = urlParse(window.location.href)['pic'];
    this.name = urlParse(window.location.href)['name'];
    this.token = getToken();
    /**
     * 2019-02-15
     * @author maiziyao
     * 获取提水券list
     */
    this.appService.postAliData(this.appProperties.shopGetPickRecordUrl, {itemId: this.id}, this.token).subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.data.length <= 0 ? this.empty = true : this.empty = false;
      },
      error => {
        console.log(error);
      }
    );
  }
}
