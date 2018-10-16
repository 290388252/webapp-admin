import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';
import {AppService} from '../../../app-service';
import {getToken, urlParse} from '../../../utils/util';

declare var BMap: any;

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
  private token;
  public lineList;

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
    const map = new BMap.Map('container'); // 创建地图实例
    // const point = new BMap.Point('113.50238', '23.15673'); // 创建点坐标
    // const point = new BMap.Point('113.472844','23.173217'); // 创建点坐标
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    const _this = this;
    // 获取用户坐标
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      //根据point对象创建标记遮挡物，并添加到地图中
      // 创建标注
      // const mk = new BMap.Marker(r.point);
      // 将标注添加到地图中
      // map.addOverlay(mk);
      //将地图中心设置为获得的当前位置
      // map.panTo(r.point);
      map.centerAndZoom(r.point, 15);  // 初始化地图，设置中心点坐标和地图级别
      // 自定义样式
      addMarker(r.point);
      function addMarker(point) {  // 创建图标对象
        var myIcon = new BMap.Icon('../../../../assets/icon/dw2.png', new BMap.Size(20, 20), {offset: new BMap.Size(10, 25)});
        // 创建标注对象并添加到地图
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
      }
      // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      //

      // const list = [{'lon':'113.513346','lat':'23.161773','locatoinName':'东荟城'},
      //   {'lon':'113.50713','lat':'23.160238','locatoinName':'公交站'},
      //   {'lon':'113.502107','lat':'23.156644','locatoinName':'A1'}];
      // _this.appService.getAliData(_this.appProperties.vendingMachinesInfoNearbyListPageUrl + `lon=${r.point.lng}&lat=${r.point.lat}`,
      let date=new Date();
      let timer=date.getTime().toString();
      _this.appService.getAliData(_this.appProperties.vendingMachinesInfoNearbyListPageUrl + `time=`+ timer,
        {'lon':r.point.lng,'lat':r.point.lat}, _this.token).subscribe(
        data => {
          console.log('请求');
          console.log(data);
          _this.lineList = data.returnObject;
          if(_this.lineList.length > 0) {
            console.log('123');
            for (let i = 0; i < _this.lineList.length; i++) {
              const marker = new BMap.Marker(new BMap.Point(_this.lineList[i]['lon'], _this.lineList[i]['lat']));  // 创建标注
              const content = _this.lineList[i]['locatoinName'];
              const opts = {
                width: 250,     // 信息窗口宽度
                height: 80,     // 信息窗口高度
                title: '优水到家', // 信息窗口标题
                enableMessage: true // 设置允许信息窗发送短息
              };
              marker.enableDragging(); // marker可拖拽
              map.addOverlay(marker);               // 将标注添加到地图中
              addClickHandler(content, marker, opts, map);
            }
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
            maps.openInfoWindow(infoWindows, points); // 开启信息窗口
            // console.log(content, e.target, opts, maps, infoWindows);
          }
        },
        error => {
          console.log(error);
        }
      );
      // _this.lineList = [{'lon':'113.513346','lat':'23.161773','locatoinName':'东荟城'},
      //   {'lon':'113.50713','lat':'23.160238','locatoinName':'公交站'},
      //   {'lon':'113.502107','lat':'23.156644','locatoinName':'A1'}];



    }, {enableHighAccuracy: true});
  }
}
