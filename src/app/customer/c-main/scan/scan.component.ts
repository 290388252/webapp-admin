import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
declare var wx: any;
@Component({
  selector: 'app-user-detail',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.scan();
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 返回首页
   */
  goTo() {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
      'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 扫一扫
   */
  scan() {
    this.appService.postScanData(this.appProperties.wechatShareInfoUrl,
      // + '?url=http://sms.youshuidaojia.com:9800/user?vmCode=' + urlParse(window.location.href)['vmCode'],
      {url: window.location.href}).subscribe(
      data => {
        console.log(data);
        wx.config({
          debug: false,
          appId: data.data.appId,
          timestamp: data.data.timestamp,
          nonceStr: data.data.nonceStr,
          signature: data.data.signature,
          jsApiList: ['checkJsApi',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'scanQRCode'
          ]
        });
        wx.ready(function () {
          console.log(123);
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              console.log(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
              window.location.href = res.resultStr;
            }
          });
        });
        wx.error(function (res) {
          console.log(res);
        });
      },
      error2 => {
        console.log(error2);
      }
    );
  }
}
