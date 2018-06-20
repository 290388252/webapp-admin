import {Component, Inject, OnInit} from '@angular/core';
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
              private appService: AppService,
              @Inject('login') private loginService) {
  }

  ngOnInit() {
    this.text = '点击获取验证码';
    console.log(urlParse(window.location.search)['openId']);
  }
  focusCodes() {
    // console.log(document.getElementById('user-container').style.height);
    // console.log(document.documentElement.offsetHeight);
    // document.getElementById('user-container').style.height = (document.documentElement.offsetHeight + 50) + 'px';
  }
  // 发送验证码
  send(e: TouchEvent) {
    e.preventDefault();
    const status = this.loginService.sendMsg(this.username);
    console.log(status);
    if (status !== false) {
        this.isLoading = true;
        this.endText = '秒后重发';
        this.text = 60;
        const timer = setInterval(() => {
          this.text --;
          if (this.text <= 0) {
            this.isLoading = false;
            this.text = '点击获取验证码';
            this.endText = '';
            clearInterval(timer);
            }
          }, 1000);
        setTimeout(() => {
          this.isLoading = false;
          this.text = '点击获取验证码';
          this.endText = '';
          }, 60100);
    }
    // if (/^1[34578]\d{9}$/.test(this.username.toString())) {
    //   this.appService.postData(this.appProperties.smsSendUrl, {phone: this.username}).subscribe(
    //     data => {
    //       console.log(data);
    //       if (data.code !== 0) {
    //         alert('发送失败');
    //       } else {
    //         this.isLoading = true;
    //         this.endText = '秒后重发';
    //         this.text = 60;
    //         const timer = setInterval(() => {
    //           this.text --;
    //           if (this.text <= 0) {
    //             this.isLoading = false;
    //             this.text = '点击获取验证码';
    //             this.endText = '';
    //             clearInterval(timer);
    //           }
    //         }, 1000);
    //         setTimeout(() => {
    //           this.isLoading = false;
    //           this.text = '点击获取验证码';
    //           this.endText = '';
    //         }, 60100);
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // } else {
    //   this.isLoading = false;
    // }
  }
  // 登陆
  login() {
    this.loginService.loginWithCredentials(this.username, this.code);
  }
}
