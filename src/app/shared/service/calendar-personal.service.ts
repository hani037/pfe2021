import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {event} from "../model/event";
import {CalendarPersonal} from "../model/calendarPersonal";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarPersonalService {
  CalendarEmitter = new BehaviorSubject<boolean>(false);
  changeEmitter = new BehaviorSubject<string>(null);
  calendarPersonalUrl = '/api/v1/calendarPersonal';
  constructor(private http:HttpClient) { }
  get_user_calendars(){
    return this.http.get<CalendarPersonal[]>(this.calendarPersonalUrl);
  }
  get_calendar(id){
    return this.http.get<CalendarPersonal>(this.calendarPersonalUrl+'/'+id);
  }
  add_calendar(name:string){
    return this.http.post<CalendarPersonal>(this.calendarPersonalUrl,name);
  }
}
