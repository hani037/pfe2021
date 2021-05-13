import {Appointment} from "./appointment";

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
}
