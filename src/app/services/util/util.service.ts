import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {EventType} from '../../enums/event-type.enum';
import {EventData} from '../../interfaces/event-data';


@Injectable()
export class UtilService {

  subject: Subject<EventData> = new Subject();

  hideLoading() {
    this.subject.next({
      type: EventType.TYPE_LOADING_HIDE,
      data: null
    });
  }

  loading(data?: any | string) {
    console.log(data);
    this.subject.next({
      type: EventType.TYPE_LOADING,
      data: data
    });
  }

  constructor() {
  }

}
