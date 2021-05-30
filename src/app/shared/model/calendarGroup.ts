
import {CalendarPro} from "./CalendarPro";
import {Admin} from "./admin";

export class CalendarGroup {
  id:string;
  admins:Admin[];
  name:string;
  userId:string;
  address:string;
  lat:number;
  lon:number;
  calendarProList:CalendarPro[];
}
