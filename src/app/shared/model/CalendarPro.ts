import {DaySchedule} from "./daySchedule";
import {Appointment} from "./appointment";

export class CalendarPro {
  id;
  userId;
  firstName:string;
  lastName:string;
  job:string;
  startDate:Date;
  chrono:number;
  expiryDate:Date;
  lat:number;
  lon:number;
  appointment:Appointment[];
  weekSchedule :DaySchedule[];

  public static clone(src:CalendarPro, dest : CalendarPro):void {
    dest.id = src.id;
    dest.job = src.job;
    dest.chrono = src.chrono;

  }
}
