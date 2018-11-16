import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';
import {AppService} from '../../../app-service';
import {getToken, urlParse} from '../../../utils/util';
// import * as $ from 'jquery'

declare var BMap: any;
declare var BMapLib: any;

@Component({
  selector: 'app-machine-detail',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public nzOptions = [{value: '', label: '', isLeaf: true}];
  public selectValues: string;
  public id = [];
  private lon;
  private lat;
  public mapLng;
  public mapLat;
  private token;
  public lineList;
  public map;
  // public local;
  public location;
  public firstLocation;
  public userPoint;
  public userAddress;
  public detailShow = false;

  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }

  ngOnInit() {
    if (getToken() === null || getToken() === undefined || getToken() === 'undefined') {
      this.token = urlParse(window.location.search)['shopToken'];
    } else {
      this.token = getToken();
    }
    // this.baiduMap([{lon: 113.50238, lat: 23.15673, locationName: '广州市黄埔区开发区开源大道11号B10栋4层', companyName: '优水到家'}]);
    this.baiduMap();
  }

  baiduMap() {
    const map = new BMap.Map('contain'); // 创建地图实例
    // const point = new BMap.Point('113.50238', '23.15673'); // 创建点坐标
    // map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    const _this = this;
    _this.map = map;
    // 获取用户坐标
    const geolocation = new BMap.Geolocation();

    geolocation.getCurrentPosition(function (r) {
      let _value = r.address;
      _this.userAddress = _value.province + _value.city + _value.district + _value.street + _value.street_number;
      _this.firstLocation = _this.userAddress;
      // 根据point对象创建标记遮挡物，并添加到地图中
      // 创建标注
      // const mk = new BMap.Marker(r.point);
      // 将标注添加到地图中
      // map.addOverlay(mk);
      // 将地图中心设置为获得的当前位置
      // map.panTo(r.point);
      map.centerAndZoom(r.point, 15);  // 初始化地图，设置中心点坐标和地图级别
      // 自定义样式
      _this.userPoint = r;
      addMarker(r.point);
      _this.mapLng = _this.userPoint.point.lng;
      _this.mapLat = _this.userPoint.point.lat;

      paint(_this.userPoint.point);


      // 添加定位控件
      const geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener('locationSuccess', function (e) {
        let _value = e.addressComponent;
        _this.userAddress = _value.province + _value.city + _value.district + _value.street + _value.streetNumber;
        map.clearOverlays();
        addMarker(e.point);
        paint(e.point);
        G('address').innerHTML = '';
        _this.mapLng = e.point.lng;
        _this.mapLat = e.point.lat;

      });
      geolocationControl.addEventListener('locationError', function (e) {
        // 定位失败事件
        alert(e.message);
      });
      map.addControl(geolocationControl);

      // 自动搜索事件
      function G(id) {
        return document.getElementById(id);
      }

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
        _this.userAddress = myValue;
        setPlace();
      });

      function setPlace() {
        // map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {

          const searchPoint = local.getResults().getPoi(0).point;    // 获取第一个智能搜索的结果
          _this.mapLng = searchPoint.lng;
          _this.mapLat = searchPoint.lat;
          getList(searchPoint);

          // map.addOverlay(new BMap.Marker(searchPoint));    //添加标注
        }

        const local = new BMap.LocalSearch(map, { // 智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }

    }, {enableHighAccuracy: true});
    // 监听button事件
    window.onload = function () {
      document.getElementById('check').onclick = function () {
        setPlaceA();
      };
    };

    // 绘制坐标
    function paint(point) {
      const date = new Date();
      const timer = date.getTime().toString();
      // addMarker(point);
      _this.appService.getData(_this.appProperties.vendingMachinesInfoNearbyListPageUrl + `time=` + timer,
        {'lon': point.lng, 'lat': point.lat}).subscribe(
        data => {
          _this.lineList = data.returnObject;
          if (_this.lineList.length > 0) {
            for (let i = 0; i < _this.lineList.length; i++) {
              const myIconA = new BMap.Icon('../../../../assets/icon/mapIcon.png', new BMap.Size(25, 25), {offset: new BMap.Size(10, 25)});
              const marker = new BMap.Marker(new BMap.Point(_this.lineList[i]['lon'], _this.lineList[i]['lat']), {icon: myIconA});  // 创建标注
              const vmCode = _this.lineList[i]['code'];
              const vmVersion = _this.lineList[i]['machineVersion'];
              const vmDistance = _this.lineList[i]['distance'];
              const content = _this.lineList[i]['locatoinName'] + '<div id="LoginBox">'
                + '<span id="vmCode" style="display: none">' + vmCode + '</span>'
                + '<span id="vmVersion" style="display: none">' + vmVersion + '</span>'
                + '<span id="vmDistance" style="position: absolute;top: 0;right: 36px;">' + Math.round(vmDistance) + 'm</span>'
                + '<input onclick="javascript:{window.location.href = \'http://webapp.youshuidaojia.com/cMain/mapDetails?vmCode=\' + document.getElementById(\'vmCode\').innerHTML + \'&version=\' +document.getElementById(\'vmVersion\').innerHTML}" type="button" id="abc11" value="详情 >" style="background:none;border:none;width: 50px;margin-top: 1px;margin-left: 200px;color: #3e85ff;">'
                + '<span style="position: absolute;top: 0;right: 0;"><img src="../../../../assets/icon/userIcon.png" style="width: 15px;height: 15px"></span>'
                + '</div>';
              const opts = {
                width: 250,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title: '优水到家', // 信息窗口标题
                enableMessage: true // 设置允许信息窗发送短息
              };
              const infoBox = new BMapLib.InfoBox(map, '百度地图api', {
                boxStyle: { width: '200px'},
                closeIconMargin: '10px 2px 0 0',
                enableAutoPan: true,
                alignBottom: false
                });
              marker.disableDragging(); // marker可拖拽
              map.addOverlay(marker);               // 将标注添加到地图中
              addClickHandler(content, marker, opts, map);
            }

          } else {
            _this.detailShow = true;
            setTimeout(() => {
              _this.detailShow = false;
            }, 3000);
          }

          function addClickHandler(content, marker, opts, maps) {
            marker.addEventListener('click', (e) => {
                openInfo(content, e, opts, maps);
              }
            );
          }

          function openInfo(content, e, opts, maps) {
            const p = e.target;
            const points = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            const infoWindows = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
            infoWindows.addEventListener('click', (e) => {
                openInfo(content, e, opts, maps);
              }
            );
            maps.openInfoWindow(infoWindows, points); // 开启信息窗口
          }
        },
        error => {
          console.log(error);
        }
      );
    }

    // 创建当前图标对象
    function addMarker(point) {
      const myIcon = new BMap.Icon('../../../../assets/icon/dw2.png', new BMap.Size(20, 20), {offset: new BMap.Size(10, 25)});
      // 创建标注对象并添加到地图
      const marker = new BMap.Marker(point, {icon: myIcon});
      map.addOverlay(marker);
    }

    // 按钮搜索
    function setPlaceA() {
      // map.clearOverlays();
      _this.userAddress = _this.firstLocation;

      function myFun() {
        const searchPoint = local.getResults().getPoi(0).point;    // 获取第一个智能搜索的结果
        _this.mapLng = searchPoint.lng;
        _this.mapLat = searchPoint.lat;
        getList(searchPoint);

      }

      const local = new BMap.LocalSearch(map, { // 智能搜索
        onSearchComplete: myFun
      });
      local.search(_this.location);
    }

    // 判断附件是否有售货机
    function getList(searchPoint) {
      const date = new Date();
      const timer = date.getTime().toString();
      _this.appService.getData(_this.appProperties.vendingMachinesInfoNearbyListPageUrl + `time=` + timer,
        {'lon': searchPoint.lng, 'lat': searchPoint.lat}).subscribe(
        data => {
          if (data.status === 1) {
            if (data.returnObject.length > 0) {
              map.clearOverlays();
              _this.detailShow = false;
              map.centerAndZoom(searchPoint, 15);
              addMarker(searchPoint);
              paint(searchPoint);
            } else {
              map.clearOverlays();
              map.centerAndZoom(searchPoint, 14);
              // paint(searchPoint);
              addMarker(searchPoint);
              _this.detailShow = true;
              setTimeout(() => {
                _this.detailShow = false;
              }, 3000);
            }
          }

        },
        error => {
          console.log(error);
        }
      );
    }
  }

  goTo(mapLng, mapLat, userAddress) {
    this.router.navigate(['cMain/mapList'], {
      queryParams: {
        mapLng: mapLng,
        mapLat: mapLat,
        userAddress: userAddress,
      }
    });
  }

  check() {
    this.detailShow = false;
  }

  cancel() {
    this.detailShow = false;
    this.location = undefined;
  }
}
