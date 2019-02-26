import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {isCombinedNodeFlagSet} from 'tslint';
import {NzModalService} from 'ng-zorro-antd';

declare var BMap: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './mapList.component.html',
  styleUrls: ['./mapList.component.css']
})
export class MapListComponent implements OnInit {
  public imgUrl = this.appProperties.filesImgUrl;
  // get
  public detailsList;
  public mapLng;
  public mapLat;
  // public imageUrl = this.appProperties.shopImgUrl;
  public location;
  public detailShow;
  public userAddress;
  public token;
  public show;
  public imgShow;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.mapLng = urlParse(window.location.href)['mapLng'];
    this.mapLat = urlParse(window.location.href)['mapLat'];
    this.userAddress = urlParse(window.location.href)['userAddress'];
    this.location = this.userAddress;
    // this.token = getToken();
    this.getVmDetails(this.mapLng, this.mapLat);
    this.baiduCheck(1);

  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取输入地址附近的售货机list
   */
  getVmDetails(mapLng, mapLat) {
    const date = new Date();
    const timer = date.getTime().toString();
    this.appService.getData(this.appProperties.vendingMachinesInfoNearbyListPageUrl + `time=` + timer,
      {'lon': mapLng, 'lat': mapLat}).subscribe(
      data => {
        if (data.status === 1) {
          this.detailsList = data.returnObject;
          if (this.detailsList.length === 0) {
            this.detailShow = true;
            this.show = false;
            this.imgShow = true;
          } else {
            this.detailShow = false;
            this.show = true;
            this.imgShow = false;
          }
        }

      },
      error => {
        console.log(error);
      }
    );

  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 获取该售货机的距离
   */
  turnDistance(num) {
    return Math.round(num);
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 搜索地址
   */
  baiduCheck(version) {

    const map = new BMap.Map(); // 创建地图实例
    const _this = this;

    // 搜索
    function G(id) {
      return document.getElementById(id);
    }
    setTimeout(() => {
      const ac = new BMap.Autocomplete(    // 建立一个自动完成的对象
        {
          'input': 'address'
          , 'location': map
        });

      ac.addEventListener('onhighlight', function (e) {  // 鼠标放在下拉列表上的事件
        let str = '';
        let _value = e.fromitem.value;
        let value = '';
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value;

        value = '';
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value;
        G('address').innerHTML = str;
      });

      let myValue;
      ac.addEventListener('onconfirm', function (e) {    // 鼠标点击下拉列表后的事件
        const _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G('address').innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue;
        setPlace();
      });

      function setPlace() {
        map.clearOverlays();    // 清除地图上所有覆盖物
        function myFun() {
          const searchPoint = local.getResults().getPoi(0).point;    // 获取第一个智能搜索的结果
          _this.mapLng = searchPoint.lng;
          _this.mapLat = searchPoint.lat;
          window.onload = function () {
            document.getElementById('check').onclick = function () {
              setPlaceA();
            };
          }
          _this.getVmDetails(_this.mapLng, _this.mapLat);

        }

        const local = new BMap.LocalSearch(map, { // 智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }
    });

    function setPlaceA() {
      function myFun() {
        const searchPoint = local.getResults().getPoi(0).point;    // 获取第一个智能搜索的结果
        _this.mapLng = searchPoint.lng;
        _this.mapLat = searchPoint.lat;
        window.onload = function () {
          document.getElementById('check').onclick = function () {
            setPlaceA();
          };
        }
        _this.getVmDetails(_this.mapLng, _this.mapLat);

      }

      const local = new BMap.LocalSearch(map, { // 智能搜索
        onSearchComplete: myFun
      });
      local.search(_this.location);
    }
    setTimeout(() => {
      document.getElementById('check').onclick = function () {
        setPlaceA();
      };
    });
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 跳转页面
   */
  goTo() {
    this.router.navigate(['cMain/cardMap']);
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 点击输入框
   */
  empty() {
    this.detailsList = [];
    this.imgShow = false;
  }
  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭弹框
   */
  cancel() {
    this.show = true;
    this.detailShow = false;
    this.location = undefined;
    this.detailsList = [];
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭弹框
   */
  goDetails(vmCode, version) {
    this.router.navigate(['cMain/mapDetails'], {
      queryParams: {
        vmCode: vmCode,
        version: version
      }
    });
  }
}
