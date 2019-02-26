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
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 发送验证码
   */
  send(e: TouchEvent) {
    e.preventDefault();
    const status = this.loginService.sendMsg(this.username);
    if (status !== false) {
      this.isLoading = true;
      this.endText = '秒后重发';
      this.text = 60;
      const timer = setInterval(() => {
        this.text--;
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
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 登陆
   */
  login() {
    this.loginService.loginWithCredentials(this.username, this.code);
  }
}
