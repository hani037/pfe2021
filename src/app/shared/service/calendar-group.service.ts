import { Injectable } from '@angular/core';
import {CalendarPro} from "../model/CalendarPro";
import {HttpClient} from "@angular/common/http";
import {CalendarGroup} from "../model/calendarGroup";



@Injectable({
  providedIn: 'root'
})
export class CalendarGroupService {
  calendarGroupUrl = '/api/v1/calendarGroup';
  constructor(private http:HttpClient) { }
  get_user_calendarsGroup(){
    return this.http.get<CalendarGroup[]>(this.calendarGroupUrl);
  }
  createCalendarGroup(calendarGroup:CalendarGroup){
    return this.http.post<CalendarGroup>(this.calendarGroupUrl,calendarGroup);
  }
  addCalendarPro(id:string,calendarPro:CalendarPro){
    return this.http.post<CalendarPro>(this.calendarGroupUrl+'/'+id,calendarPro).toPromise();
  }

  get_calendar(id: string) {
    return this.http.get<CalendarGroup>(this.calendarGroupUrl+'/'+id);
  }

  updateCalendarGroup(calendarGroup: CalendarGroup) {
    return this.http.put<CalendarGroup>(this.calendarGroupUrl+'/'+calendarGroup.id,calendarGroup);

  }
}
