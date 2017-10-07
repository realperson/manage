import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {EventType} from '../../enums/event-type.enum';
import {EventData} from '../../interfaces/event-data';


@Injectable()
export class UtilService {

  subject: Subject<EventData> = new Subject();
  // position=[
  //
  // ];

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



  constructor() {
  }

}
