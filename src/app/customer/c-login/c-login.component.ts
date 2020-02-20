import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppProperties} from '../../app.properties';
import {AppService} from '../../app-service';
import {urlParse} from '../../utils/util';

@Component({
  selector: 'app-login',
  templateUrl: './c-login.component.html',
  styleUrls: ['./c-login.component.css']
})
export class CLoginComponent implements OnInit {
  public username;
  public code;
  public isLoading = false;
  public text: any;
  public endText: string;
  public city: any;
  public vmCode: number;
  public showVmCode: boolean;
  constructor(private router: Router,
              private appProperties: AppProperties,
              private appService: AppService,
              @Inject('cLogin') private loginService) {
  }

  ngOnInit() {
    this.text = '点击获取验证码';
  }
  focusCodes() {
    // console.log(document.getElementById('user-container').style.height);
    // console.log(document.documentElement.offsetHeight);
    // document.getElementById('user-container').style.height = (document.documentElement.offsetHeight + 50) + 'px';
  }
  /**
   * 2019-12-25
   * @author maiziyao
   * 选择当前城市
   */
  selectCity(val) {
    console.log(val);
    this.city = val;
    console.log(val === '1');
    if (val === '1') {
      this.showVmCode = true;
    } else {
      this.showVmCode = false;
    }
  }
  /**
   * 2019-02-14
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
  /**
   * 2019-02-14
   * @author maiziyao
   * 登陆
   */
  login() {
    if (this.city === '1') {
      if (this.vmCode === null || this.vmCode === undefined) {
        alert('请输入售货机编号');
        return;
      }
    } else {
      this.vmCode = null;
    }
    this.loginService.loginWithCredentials(this.username, this.code, this.city, this.vmCode);
  }
}
