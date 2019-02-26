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
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public nzOptions = [{value: '', label: '', isLeaf: true}];
  public selectValues: string;
  public id = [];

  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }

  ngOnInit() {
    this.appService.postAliData(this.appProperties.vendingLineFindLineByForm, {isShowAll: 1}, getAdminToken()).subscribe(
      data => {
        if (data.status !== -1) {
          data.returnObject.forEach(item => {
            this.nzOptions.push({value: `${item.id},${item.companyId},${item.areaId}`, label: item.name, isLeaf: true});
          });
        }
      },
      error => {
        console.log(error);
      }
    );
    this.baiduMap([{lon: 113.50238, lat: 23.15673, locationName: '广州市黄埔区开发区开源大道11号B10栋4层', companyName: '优水到家'}]);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 监听输入框内容变化
   */
  onChanges(e) {
    this.id = e[0].split(',');
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 点击搜索地址
   */
  onSearch() {
    this.appService.getAliData(this.appProperties.vendingMachinesInfoListPageUrl,
      {
        isShowAll: 1,
        lineId: this.id[0],
        companyId: this.id[1],
        areaId: this.id[2]
      }, getAdminToken()).subscribe(
      data => {
        this.baiduMap(data.returnObject);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 调用百度地图
   */
  baiduMap(list) {
    const map = new BMap.Map('container'); // 创建地图实例
    const point = new BMap.Point(list[0]['lon'], list[0]['lat']); // 创建点坐标
    // const point = new BMap.Point(113.478284, 23.119538); // 创建点坐标
    map.centerAndZoom(point, 15);  // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    for (let i = 0; i < list.length; i++) {
      const marker = new BMap.Marker(new BMap.Point(list[i]['lon'], list[i]['lat']));  // 创建标注
      const content = list[i]['locationName'];
      const opts = {
        width: 250,     // 信息窗口宽度
        height: 80,     // 信息窗口高度
        title: list[i]['companyName'], // 信息窗口标题
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
