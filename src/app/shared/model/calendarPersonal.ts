import {event} from "./event";
import {Appointment} from "./appointment";

export class CalendarPersonal {
  id:string;
  name:string;
  userId:string;
  events:event[];
  appointment:Appointment[];
  public static clone(src: CalendarPersonal, dest : CalendarPersonal):void {
    dest.id = src.id;
    dest.userId = src.userId;
    dest.name = src.name;
    dest.events = src.events;
    dest.appointment = src.appointment;
  }
}
