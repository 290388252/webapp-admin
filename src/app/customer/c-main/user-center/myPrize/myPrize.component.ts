import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@ Component({
  selector: 'app-user-detail',
  templateUrl: './myPrize.component.html',
  styleUrls: ['./myPrize.component.css']
})
export class MyPrizeComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public empty: boolean;
  public token;
  public prizeList;

  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    this.getDate();
  }

  /**
   * 2019-03-05
   * @author mzy
   * 获取奖品list
   */
  getDate() {
    this.appService.postAliData(this.appProperties.prizeUrl, '', this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.prizeList = data.returnObject;
          this.empty = false;
        } else {
          this.empty = true;
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-03-05
   * @author mzy
   * 获取第一张图片
   */
  turnImg(arr) {
    let img;
    if (arr.indexOf(',') === '-1') {
      img = arr;
    } else {
      const arrImg = arr.split(',');
      img = arrImg[0];
    }
    return img;
  }

  /**
   * 2019-03-05
   * @author mzy
   * 返回首页
   */
  goTo() {
    this.router.navigate(['cMain/firstPage']);
  }
}
