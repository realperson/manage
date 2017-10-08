import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {EventType} from '../../enums/event-type.enum';
import {EventData} from '../../interfaces/event-data';


@Injectable()
export class UtilService {

  /**
   * 用于向组件发送事件
   * @type {Subject}
   */
  subject: Subject<EventData> = new Subject();

  /**
   * 位置列表
   * @type {[string,string,string,string,string,string]}
   */
  position = [
    'left', 'center', 'right', 'top', 'middle', 'bottom'
  ];

  /**
   * 倒计时占位符
   * @type {string}
   */
  countDownPlaceholder = '[count-down]';

  /**
   * 隐藏加载动画
   */
  hideLoading() {
    this.subject.next({
      type: EventType.TYPE_LOADING_HIDE,
      data: null
    });
  }

  /**
   * 显示加载动画
   * @param data
   */
  loading(data?: any | string) {
    this.subject.next({
      type: EventType.TYPE_LOADING,
      data: data
    });
  }

  /**
   * 隐藏加载动画
   */
  hideToast() {
    this.subject.next({
      type: EventType.TYPE_TOAST_HIDE,
      data: null
    });
  }

  /**
   * 显示加载动画
   * @param data
   */
  toast(data: any | string) {
    this.subject.next({
      type: EventType.TYPE_TOAST,
      data: data
    });
  }

  /**
   * 隐藏弹出框
   */
  hideAlert() {
    this.subject.next({
      type: EventType.TYPE_ALERT_HIDE,
      data: null
    });
  }

  /**
   * 显示弹出框
   * @param data
   */
  alert(data: any | string) {
    this.subject.next({
      type: EventType.TYPE_ALERT,
      data: data
    });
  }


  constructor() {
  }

}
