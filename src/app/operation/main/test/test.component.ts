import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {AppProperties} from '../../../app.properties';
import {AppService} from '../../../app-service';
import {getAdminToken, urlParse} from '../../../utils/util';

declare var BMap: any;
declare var BMapLib: any;
declare var BMAPLIB_TAB_SEARCH: any;
declare var BMAPLIB_TAB_TO_HERE: any;
declare var BMAPLIB_TAB_FROM_HERE: any;

@Component({
  selector: 'app-machine-detail',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }
   ngOnInit() {
     this.appService.postAliData(this.appProperties.replenishUrl, '', getAdminToken()).subscribe(
       data => {
         this.baiduMap(data.returnObject.replenishVMList);
       },
       error => {
         console.log(error);
       }
     );
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 百度地图插件调用
   */
  baiduMap(list) {
    const map = new BMap.Map('container'); // 创建地图实例
    const point = new BMap.Point(list[1]['lon'], list[1]['lat']); // 创建点坐标
    map.centerAndZoom(point, 15);  // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    for (let i = 0; i < list.length; i++) {
      const marker = new BMap.Marker(new BMap.Point(list[i]['lon'], list[i]['lat']));  // 创建标注
      const content = list[i]['locationName'];
      const opts = {
        width : 250,     // 信息窗口宽度
        height: 80,     // 信息窗口高度
        title : list[i]['companyName'], // 信息窗口标题
        enableMessage: true // 设置允许信息窗发送短息
      };
      marker.enableDragging(); // marker可拖拽
      map.addOverlay(marker);               // 将标注添加到地图中
      addClickHandler(content, marker, opts);
    }
    function addClickHandler(content, marker, opts) {
      marker.addEventListener('click', (e) => {
          openInfo(content, e, opts);
        }
      );
    }
    function openInfo(content, e, opts) {
      const p = e.target;
      const points = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      const infoWindows = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
      map.openInfoWindow(infoWindows, points); // 开启信息窗口
    }
  }
}
