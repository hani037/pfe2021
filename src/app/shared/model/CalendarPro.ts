import {DayScheduleEs} from "./DayScheduleEs";
import {Appointment} from "./appointment";

export class CalendarPro {
  id;
  userId;
  firstName:string;
  lastName:string;
  job:string;
  startDate:string;
  expiryDate:string;
  lat:number;
  lon:number;
  appointment:Appointment[];
}
