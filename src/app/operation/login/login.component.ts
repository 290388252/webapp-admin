import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
    this.text = '发送验证码';
  }
  send() {
    this.isLoading = true;
    this.endText = '秒后点击重新发送';
    this.text = 60;
    const timer = setInterval(() => {
      this.text --;
      if (this.text <= 0) {
        this.isLoading = false;
        clearInterval(timer);
      }
    }, 1000);
    setTimeout(() => {
      this.isLoading = false;
      this.endText = '';
    }, 60100);
  }
}
