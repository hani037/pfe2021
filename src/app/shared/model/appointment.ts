import {Seance} from "./seance";
import {Meeting} from "./meeting";

export class Appointment {
  id:string;
  userId:string;
  calendarPersonalId:string;
  calendarProId:string;
  date:string;
  start:string;
  end:string;
  nbPlaces:number;
  seanceId:string;
  status?:string;
  videoConsultation:boolean;
  meeting:Meeting;
}
