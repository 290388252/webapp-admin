import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AppProperties {
    // public
    public appUrl: string;

    constructor() {
      // Public
      this.appUrl = 'http://192.168.0.104:6662/ys_admin'; // localtest

    }
}
