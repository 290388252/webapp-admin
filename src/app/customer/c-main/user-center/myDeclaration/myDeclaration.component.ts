import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../app-service';
import {AppProperties} from '../../../../app.properties';
import {getToken, urlParse} from '../../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './myDeclaration.component.html',
  styleUrls: ['./myDeclaration.component.css']
})
export class MyDeclarationComponent implements OnInit {
  public token;
  public cursor = 2;
  public declarationList = [];
  public imgUrl = this.appProperties.complainImgUrl;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    this.getData(this.cursor);
  }
  getData(state) {
    let val;
    if (state === 2) {
      val = '';
    } else {
      val = state;
    }
    this.appService.postAliData(this.appProperties.tblCustomerMyDeclaration, {state: val}, this.token).subscribe(
      data => {
        console.log(data);
        this.declarationList = data.returnObject;
        this.declarationList.forEach(item => {
          item.contentText = '';
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  turnText(src) {
    return src === 1 ? '优水客服:' : '我:';
  }
  ask(num) {
    /*console.log(list);*/
    if (this.declarationList[num].contentText !== '') {
      this.appService.postFormData(this.appProperties.tblCustomerComplainReplyIsReplyUrl, {complainId: this.declarationList[num].id}, this.token).subscribe(
        data => {
          console.log(data);
          if (data.status === 1) {
            this.appService.postAliData(this.appProperties.tblCustomerComplainReplyAddUrl, {
              complainId: this.declarationList[num].id,
              content: this.declarationList[num].contentText,
              /*createName: this.declarationList[num].nickName,*/
            }, this.token).subscribe(
              data2 => {
                console.log(data2);
                if (data2.status === 1) {
                  alert(data2.message);
                  this.getData(this.cursor);
                } else {
                  alert(data2.message);
                }
              },
              error2 => {
                console.log(error2);
              }
            );
          } else {
            alert(data.message);
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      alert('继续提问的话需要文本框输入大于1的字符！');
    }
  }
  selectBtn(flag) {
    this.cursor = flag;
    this.getData(this.cursor);
  }
}