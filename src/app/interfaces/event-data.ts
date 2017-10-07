import {EventType} from '../enums/event-type.enum';

export interface EventData {
  type: EventType;
  data: any;
}

