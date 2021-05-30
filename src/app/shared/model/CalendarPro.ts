import {DaySchedule} from "./daySchedule";
import {Appointment} from "./appointment";
import {AppointmentCalendarPro} from "./appointmentCalendarPro";
import {Exception} from "./exception";
import {Admin} from "./admin";

export class CalendarPro {
  id;
  userId;
  calendarGroupId;
  admins:Admin[];
  firstName:string;
  lastName:string;
  job:string;
  startDate:Date;
  chrono:number;
  expiryDate:Date;
  address:string;
  enabled:boolean;
  follow:boolean;
  videoConsultation:boolean;
  lat:number;
  lon:number;
  appointment:AppointmentCalendarPro[];
  weekSchedule :DaySchedule[];
  exception:Exception[];


}
