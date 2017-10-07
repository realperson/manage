import {Component, OnInit} from '@angular/core';
import {UtilService} from './services/util/util.service';
// import {Observable} from "rxjs/Observable";
// import "rxjs/add/observable/fromEvent";
// import "rxjs/add/operator/scan";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private util: UtilService) {
  }

  ngOnInit() {
    // this.util.loading();
    setTimeout(() => {
      // this.util.loading();
      this.util.loading('加载中...');
    }, 1000);

    setTimeout(() => {
      // this.util.loading();
      this.util.hideLoading();
    }, 4000);

    setTimeout(() => {
      // this.util.loading();
      this.util.loading('加载中...');
    }, 7000);
    // var button = document.querySelector('button');
    // Observable.fromEvent(button, 'click').subscribe((e) => console.log(e));

    // var button = document.querySelector('button');
    // Observable.fromEvent(button, 'click').scan(count => count + 1, 0)
    //   .subscribe(count => console.log(`Clicked ${count} times`));
  }
}
