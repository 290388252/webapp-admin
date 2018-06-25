import {Injectable} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken} from '../../../utils/util';

@Injectable()
export class SalesRecordService {
  constructor(private appService: AppService, private appProperties: AppProperties) {}
  getSalesInitData(): object {
    const saleList = [];
    console.log('start');
    this.appService.postAliData(this.appProperties.salesUrl, '', getToken()).subscribe(
      data => {
        console.log(data);
        data.returnObject.forEach(item => {
          saleList.push(item);
        });
      },
      error => {
        console.log(error);
      }
    );
    setTimeout(() => {
      return saleList;
    }, 1000);
    return {saleList};
  }
}
