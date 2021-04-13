import {DayScheduleEs} from "./DayScheduleEs";

export class GeoPoint {
  lat:number;
  lon:number;
}

export class CalendarProEs {
  id;
  firstName:string;
  lastName:string;
  job:string;
  expiryDate:string;
  location:GeoPoint;
  dayScheduleEs:DayScheduleEs[];
}
