import { Injectable } from '@angular/core';
import {urlParse} from '../../utils/util';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
  constructor(private appService: AppService, private appProperties: AppProperties, private router: Router) {}
  loginWithCredentials(username: string, code: string) {
    console.log(username);
    if (username !== undefined && code !== undefined) {
      this.appService.getData(this.appProperties.adminLoginUrl,
        {
          phone: username,
          smsCode: code,
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
  sendMsg(username: string): boolean {
    console.log(username);
    if (username === undefined || username === null) {
      alert('请输入手机号码');
    } else {
      if (/^1[34578]\d{9}$/.test(username.toString())) {
        this.appService.postData(this.appProperties.smsSendUrl, {phone: username}).subscribe(
          data => {
            console.log(data);
            if (data.code !== 0) {
              alert('发送失败');
            } else {
              // alert('发送失败');
            }
          },
          error => {
            console.log(error);
          }
        );
      } else {
        alert('请输入正确手机号码');
        return false;
      }
    }
  }
}
