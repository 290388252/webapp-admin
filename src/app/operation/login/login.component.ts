import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppProperties} from '../../app.properties';
import {AppService} from '../../app-service';
import {urlParse} from '../../utils/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username;
  public code;
  public isLoading = false;
  public text: any;
  public endText: string;
  constructor(private router: Router,
              private appProperties: AppProperties,
              private appService: AppService) { }

  ngOnInit() {
    this.text = '发送验证码';
  }
  send(e: TouchEvent) {
    e.preventDefault();
    if (/^1[34578]\d{9}$/.test(this.username.toString())) {
      this.appService.postData(this.appProperties.smsSendUrl, {phone: this.username}).subscribe(
        data => {
          console.log(data);
          if (data.code !== 0) {
            alert('发送失败');
          } else {
            this.isLoading = true;
            this.endText = '秒后重发';
            this.text = 60;
            const timer = setInterval(() => {
              this.text --;
              if (this.text <= 0) {
                this.isLoading = false;
                this.text = '发送验证码';
                this.endText = '';
                clearInterval(timer);
              }
            }, 1000);
            setTimeout(() => {
              this.isLoading = false;
              this.text = '发送验证码';
              this.endText = '';
            }, 60100);
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.isLoading = false;
    }
  }
  login() {
    if (this.username !== null && this.code !== null) {
      this.appService.getData(this.appProperties.adminLoginUrl,
        {
          phone: this.username,
          smsCode: this.code,
          payType: 1,
          // payType: urlParse(window.location.search)['payType'],
          openId: urlParse(window.location.search)['openId']
        }).subscribe(
        data => {
          console.log(data);
          if (data.code === undefined) {
            alert(data.message);
          } else {
            if (data.code !== 0) {
              alert(data.msg);
            } else if (data.code === 0) {
              if (data.msg !== 'success') {
                alert(data.msg);
              }
              this.router.navigate(['main/userDetail'], {
                queryParams: {
                  token: data.data
                }});
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      alert('请输入手机号或验证码');
    }
  }
}
