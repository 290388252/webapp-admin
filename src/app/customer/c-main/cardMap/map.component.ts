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
    const point = new BMap.Point('113.50238', '23.15673'); // 创建点坐标
    map.centerAndZoom(point, 15);  // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    const _this = this;
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        const mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
        _this.appService.getAliData(_this.appProperties.vendingMachinesInfoNearbyListPageUrl + `lon=${r.point.lng}&lat=${r.point.lat}`,
          '', _this.token).subscribe(
          data => {
            console.log(data);
            console.log(data.returnObject);
            const list = data.returnObject;
            for (let i = 0; i < list.length; i++) {
              const marker = new BMap.Marker(new BMap.Point(list[i]['lon'], list[i]['lat']));  // 创建标注
              const content = list[i]['locatoinName'];
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
    }, {enableHighAccuracy: true});
    // const data_info = [
    //   [113.32819, 23.139837, '地址：北京市东城区王府井大街88号乐天银泰百货八层'],
    //   [113.389098, 23.174244, '地址：北京市东城区东华门大街'],
    //   [113.384043, 23.125398, '地址：北京市东城区正义路甲5号']
    // ];
    // const opts = {
    //   width : 250,     // 信息窗口宽度
    //   height: 80,     // 信息窗口高度
    //   title : '信息窗口' , // 信息窗口标题
    //   enableMessage: true // 设置允许信息窗发送短息
    // };
  }
}
