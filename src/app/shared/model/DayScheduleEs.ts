import {GeoPoint} from "./CalendarProEs";
import {SeanceEs} from "./SeanceEs";

export class DayScheduleEs {
  id:string;
  calendarProId:string;
  location:GeoPoint;
  job:string;
  date:string;
  seances:SeanceEs[];
}
