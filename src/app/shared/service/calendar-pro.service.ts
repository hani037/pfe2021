import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalendarProEs} from "../model/CalendarProEs";
import {SearchCalendarProDto} from "../model/SearchCalendarProDto";

@Injectable({
  providedIn: 'root'
})
export class CalendarProService {

  calendarPersonalUrl = '/api/v1/calendarPro';
  constructor(private http:HttpClient) { }
  search(page,size) {
  let searchCalendarProDto = new SearchCalendarProDto();
  searchCalendarProDto.job="farmer";
  searchCalendarProDto.searchText="leclerc";
    return this.http.post<CalendarProEs[]>(this.calendarPersonalUrl+'/search?page='+page+'&size='+size,searchCalendarProDto
    )
  }
  searchByAvailability(page,size) {
    let searchCalendarProDto = new SearchCalendarProDto();
    searchCalendarProDto.job="farmer";
    searchCalendarProDto.searchText="deghais";
    return this.http.post<CalendarProEs[]>(this.calendarPersonalUrl+'/searchByAvailability?page='+page+'&size='+size,searchCalendarProDto
    )
  }
}
