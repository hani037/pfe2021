import {SeanceEs} from "./SeanceEs";

export class GeoPoint {
  lat:number;
  lon:number;
}

export class CalendarProEs {
  id;
  userId:string;
  calendarGroupId;
  firstName:string;
  lastName:string;
  job:string;
  startDate:string;
  expiryDate:string;
  address:string;
  enabled:boolean;
  location:GeoPoint;
  seanceEsList:SeanceEs[];

}
