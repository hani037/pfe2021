import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalendarProEs} from "../model/CalendarProEs";
import {SearchCalendarProDto} from "../model/SearchCalendarProDto";
import {CalendarPersonal} from "../model/calendarPersonal";
import {CalendarPro} from "../model/CalendarPro";

@Injectable({
  providedIn: 'root'
})
export class CalendarProService {

  calendarProlUrl = '/api/v1/calendarPro';
  constructor(private http:HttpClient) { }
  search(page,size) {
  let searchCalendarProDto = new SearchCalendarProDto();
  searchCalendarProDto.job="farmer";
  searchCalendarProDto.searchText="leclerc";
    return this.http.post<CalendarProEs[]>(this.calendarProlUrl+'/search?page='+page+'&size='+size,searchCalendarProDto
    )
  }
  searchByAvailabilityToday(page,size) {
    let searchCalendarProDto = new SearchCalendarProDto();
    //searchCalendarProDto.job="farmer";
    //searchCalendarProDto.searchText="deghais";
    return this.http.post<CalendarProEs[]>(this.calendarProlUrl+'/searchByAvailabilityToday?page='+page+'&size='+size,searchCalendarProDto
    )
  }
  searchByAvailabilityDate(page,size,date) {
    let searchCalendarProDto = new SearchCalendarProDto();
    //searchCalendarProDto.job="farmer";
    //searchCalendarProDto.searchText="deghais";
    searchCalendarProDto.date=date;
    return this.http.post<CalendarProEs[]>(this.calendarProlUrl+'/searchByAvailabilityDate?page='+page+'&size='+size,searchCalendarProDto
    )
  }
  get_user_calendarsPro(){
    return this.http.get<CalendarPro[]>(this.calendarProlUrl);
  }
  get_calendarPro(id){
    return this.http.get<CalendarPro>(this.calendarProlUrl+'/calendarPro/'+id);
  }
  get_calendarProEs(id){
    return this.http.get<CalendarProEs>(this.calendarProlUrl+'/calendarProEs/'+id);
  }
}
