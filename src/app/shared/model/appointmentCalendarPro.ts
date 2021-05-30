import {Appointment} from "./appointment";
import {Meeting} from "./meeting";

export class AppointmentCalendarPro {
  id:string;
  calendarProId:string;
  date:string;
  start:string;
  end:string;
  nbTotalPlaces:number;
  nbPlacesAvailable:number;
  seanceId:string;
  appointmentList:Appointment[];
  videoConsultation:boolean;
  meeting:Meeting;

}
