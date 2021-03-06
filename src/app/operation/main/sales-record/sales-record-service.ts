import {Injectable} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getAdminToken} from '../../../utils/util';

@Injectable()
export class SalesRecordService {
  constructor(private appService: AppService, private appProperties: AppProperties) {}
  getSalesInitData(): object {
    const saleList = [];
    console.log('start');
    this.appService.postAliData(this.appProperties.salesUrl, '', getAdminToken()).subscribe(
      data => {
        console.log(data);
        if (data.status === 1 ) {
          data.returnObject.forEach(item => {
            saleList.push(item);
          });
        } else if (data.status === 0) {
        }
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
