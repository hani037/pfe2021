import {Seance} from "./seance";

export class Appointment {
  id:string;
  userId:string;
  calendarPersonalId:string;
  calendarProId:string;
  date:string;
  start:string;
  end:string;
  status?:string;
}
