import {DaySchedule} from "./daySchedule";
import {Appointment} from "./appointment";
import {AppointmentCalendarPro} from "./appointmentCalendarPro";

export class CalendarPro {
  id;
  userId;
  calendarGroupId;
  firstName:string;
  lastName:string;
  job:string;
  startDate:Date;
  chrono:number;
  expiryDate:Date;
  address:string;
  enabled:boolean;
  lat:number;
  lon:number;
  appointment:AppointmentCalendarPro[];
  weekSchedule :DaySchedule[];


}
