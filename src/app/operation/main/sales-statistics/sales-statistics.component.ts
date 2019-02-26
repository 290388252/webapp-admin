import { Component, OnInit } from '@angular/core';
import {getAdminToken, urlParse} from '../../../utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {NzModalService} from 'ng-zorro-antd';
import * as eCharts from 'echarts';
@Component({
  selector: 'app-sales-record',
  templateUrl: './sales-statistics.component.html',
  styleUrls: ['./sales-statistics.component.css']
})
export class SalesStatisticsComponent implements OnInit {
  public homeList = [];
  public yesterday: string;
  public hidden: boolean;
  public hiddenData: boolean;
  public today: string;
  public month: string;
  public homeValues: string;
  public myChart;
  public homeValuesList = [{value: '', label: '所有', isLeaf: true}];
  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }
  ngOnInit() {
    /**
     * 2019-02-16
     * @author maiziyao
     * 图表插件调用
     */
    this.myChart = eCharts.init(document.getElementById('main'));
    // 获取公司初始化数据
    // this.appService.postAliData(this.appProperties.homeInithUrl, '', getAdminToken()).subscribe(
    //   data => {
    //     console.log(data);
    //     this.homeList = data.returnObject;
    //     this.homeList.forEach(item => {
    //       this.homeValuesList.push({value: item.id, label: item.name, isLeaf: true});
    //     });
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    /**
     * 2019-02-16
     * @author maiziyao
     * 获取七天数据
     */
    this.appService.getAliData(this.appProperties.payBeforeSevenDay, '', getAdminToken()).subscribe(
      data => {
        if (data.status === 1) {
          this.hidden = true;
          this.hiddenData = false;
          this.yesterday = data.returnObject.yesterday;
          this.today = data.returnObject.today;
          this.month = data.returnObject.month;
          const option = {
            title: {
              text: '元/日期'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '30px',
              containLabel: true
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: data.returnObject.days,
              axisTick: {
                alignWithLabel: true
              }
            },
            yAxis: {
              type : 'value'
            },
            series: [{
              name: '销量',
              type: 'bar',
              data: data.returnObject.jiners
            }],
            color: ['#1890ff']
          };
          this.myChart.setOption(option);
        } else if (data.status === 0) {
          this.hidden = false;
          this.hiddenData = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 搜索查询销售列表
   */
  onSearch() {
    this.appService.getAliData(this.appProperties.payBeforeSevenDay, '', getAdminToken()).subscribe(
      data => {
        this.yesterday = data.yesterday;
        this.today = data.today;
        this.month = data.month;
        const option = {
          title: {
            text: '元/日期'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: data.days
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: data.jiners
          }],
          color: ['#1890ff']
        };
        this.myChart.setOption(option);
      },
      error => {
        console.log(error);
      }
    );
  }
}
