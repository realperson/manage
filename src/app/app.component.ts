import {Component, OnInit} from '@angular/core';
import {UtilService} from './services/util/util.service';
import {PositionType} from "./enums/position-type.enum";
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

    // setTimeout(() => {
    //   // this.util.loading();
    //   this.util.loading('加载中...');
    // }, 7000);
    //
    //
    // setTimeout(() => {
    //   this.util.toast('加载中...');
    // }, 1000);

    // setTimeout(() => {
    //   // this.util.loading();
    //   this.util.hideToast();
    // }, 7000);

    // setTimeout(() => {
    //   this.util.toast({
    //     text: `${this.util.countDownPlaceholder}将跳转到百度`,
    //     time: 5,
    //     isCountDown: true,
    //     callback: this.test.bind(this),
    //     position: PositionType.TOP | PositionType.CENTER
    //   });
    // }, 1000);

    setTimeout(() => {
      this.util.alert({
        text: `确定要删除吗?`,
        ok: this.test.bind(this),
        position: PositionType.MIDDLE | PositionType.CENTER
      });
    }, 0);

    // var button = document.querySelector('button');
    // Observable.fromEvent(button, 'click').subscribe((e) => console.log(e));

    // var button = document.querySelector('button');
    // Observable.fromEvent(button, 'click').scan(count => count + 1, 0)
    //   .subscribe(count => console.log(`Clicked ${count} times`));
  }

  tip = 'tip';

  test() {
    // window.location.href = 'http://www.baidu.com';
    console.log('测试');
    console.log(this);
    console.log(this.tip);
  }
}
