import {DayScheduleEs} from "./DayScheduleEs";

export class GeoPoint {
  lat:number;
  lon:number;
}

export class CalendarProEs {
  id;
  userId:string;
  firstName:string;
  lastName:string;
  job:string;
  startDate:string;
  expiryDate:string;
  address:string;
  enabled:boolean;
  location:GeoPoint;
  dayScheduleEs:DayScheduleEs[];
}
