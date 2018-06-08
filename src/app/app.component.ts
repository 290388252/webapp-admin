import {Component, OnInit} from '@angular/core';
import FastClick from 'fastclick';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', () => {
        FastClick.attach(document.body);
        }, false);
    }
  }
}
