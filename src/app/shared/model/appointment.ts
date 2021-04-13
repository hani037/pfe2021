import {Seance} from "./seance";

export class Appointment {
  id:string;
  userId:string;
  calendarProId:string;
  date:string;
  seance:Seance;
  status?:string;
}
