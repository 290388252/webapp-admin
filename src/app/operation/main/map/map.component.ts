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
  // ngOnInit() {
  //   // 百度地图API功能
  //   const map = new BMap.Map('container');
  //   const poi = new BMap.Point(116.307852, 40.057031);
  //   map.centerAndZoom(poi, 16);
  //   map.enableScrollWheelZoom();
  //
  //   const content = '<div style="margin:0;line-height:20px;padding:2px;">' +
  //     '<img src="" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
  //     '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
  //     '</div>';
  //
  //   // 创建检索信息窗口对象
  //   let searchInfoWindow = null;
  //   searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
  //     title  : '百度大厦',      // 标题
  //     width  : 320,             // 宽度
  //     height : 105,              // 高度
  //     panel  : 'panel',         // 检索结果面板
  //     enableAutoPan : true,     // 自动平移
  //     searchTypes   : [
  //       BMAPLIB_TAB_SEARCH,   // 周边检索
  //       BMAPLIB_TAB_TO_HERE,  // 到这里去
  //       BMAPLIB_TAB_FROM_HERE // 从这里出发
  //     ]
  //   });
  //   const marker = new BMap.Marker(poi); // 创建marker对象
  //   marker.enableDragging(); // marker可拖拽
  //   marker.addEventListener('click', function(e) {
  //     searchInfoWindow.open(marker);
  //   });
  //   map.addOverlay(marker); // 在地图中添加marker
  // }

   ngOnInit() {
     // this.nzOptions = [
     //   {value: '0', label: '所有', isLeaf: true},
     //   {value: '0', label: '0%', isLeaf: true},
     //   {value: '0.1', label: '10%', isLeaf: true},
     //   {value: '0.2', label: '20%', isLeaf: true},
     //   {value: '0.3', label: '30%', isLeaf: true},
     //   {value: '0.4', label: '40%', isLeaf: true},
     //   {value: '0.5', label: '50%', isLeaf: true},
     //   {value: '0.6', label: '60%', isLeaf: true},
     //   {value: '0.7', label: '70%', isLeaf: true},
     //   {value: '0.8', label: '80%', isLeaf: true},
     //   {value: '0.9', label: '90%', isLeaf: true},
     //   {value: '1', label: '100%', isLeaf: true}
     // ];
     this.appService.postAliData(this.appProperties.vendingLineFindLineByForm, {isShowAll: 1}, getAdminToken()).subscribe(
       data => {
         console.log(data);
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
     // this.appService.getAliData(this.appProperties.vendingMachinesInfoListPageUrl, {isShowAll: 1}, getAdminToken()).subscribe(
     //   data => {
     //     console.log(data);
     //     console.log(data.returnObject);
     //     this.baiduMap(data.returnObject);
     //   },
     //   error => {
     //     console.log(error);
     //   }
     // );
  }
  onChanges(e) {
    console.log(e[0].split(','));
    this.id = e[0].split(',');
  }
  onSearch() {
    console.log(this.nzOptions);
    console.log(this.id);
    this.appService.getAliData(this.appProperties.vendingMachinesInfoListPageUrl,
      {
        isShowAll: 1,
        lineId: this.id[0],
        companyId: this.id[1],
        areaId: this.id[2]
      }, getAdminToken()).subscribe(
      data => {
        console.log(data);
        console.log(data.returnObject);
        this.baiduMap(data.returnObject);
      },
      error => {
        console.log(error);
      }
    );
  }
  baiduMap(list) {
    console.log(list);
    const map = new BMap.Map('container'); // 创建地图实例
    const point = new BMap.Point(list[0]['lon'], list[0]['lat']); // 创建点坐标
    // const point = new BMap.Point(113.478284, 23.119538); // 创建点坐标
    map.centerAndZoom(point, 15);  // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
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
