import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalendarProEs} from "../model/CalendarProEs";
import {SearchCalendarProDto} from "../model/SearchCalendarProDto";
import {CalendarPersonal} from "../model/calendarPersonal";
import {CalendarPro} from "../model/CalendarPro";
import {SeanceEs} from "../model/SeanceEs";
import {Vacation} from "../model/vacation";
import {Follows} from "../model/follows";
import {CommentEs} from "../model/CommentsEs";

@Injectable({
  providedIn: 'root'
})
export class CalendarProService {

  calendarProUrl = '/api/v1/calendarPro';


  calendarsPro : CalendarPro[] = [];

  constructor(private http:HttpClient) { }



  createCalendarPro(CalendarPro:CalendarPro){
    return this.http.post<CalendarPro>(this.calendarProUrl,CalendarPro);
  }



  getCalendarPro(id:string) {
    return this.http.get<CalendarPro>(this.calendarProUrl+'/'+id);
  }


  search(page,size) {
  let searchCalendarProDto = new SearchCalendarProDto();
  searchCalendarProDto.job="farmer";
  searchCalendarProDto.searchText="leclerc";
    return this.http.post<{content:CalendarProEs[],totalElements:number}>(this.calendarProUrl+'/search?page='+page+'&size='+size,searchCalendarProDto
    )
  }
  searchByAvailabilityToday(page,size) {
    let searchCalendarProDto = new SearchCalendarProDto();
    //searchCalendarProDto.job="farmer";
    //searchCalendarProDto.searchText="deghais";
    return this.http.post<{content:CalendarProEs[],totalElements:number}>(this.calendarProUrl+'/searchByAvailabilityToday?page='+page+'&size='+size,searchCalendarProDto
    )
  }
  searchByAvailabilityDate(page,size,date) {
    let searchCalendarProDto = new SearchCalendarProDto();
    //searchCalendarProDto.job="farmer";
    //searchCalendarProDto.searchText="deghais";
    searchCalendarProDto.date=date;
    return this.http.post<{content:CalendarProEs[],totalElements:number}>(this.calendarProUrl+'/searchByAvailabilityDate?page='+page+'&size='+size,searchCalendarProDto
    )
  }
  get_user_calendarsPro(){
    return this.http.get<CalendarPro[]>(this.calendarProUrl);
  }
  get_calendarPro(id){
    return this.http.get<CalendarPro>(this.calendarProUrl+'/calendarPro/'+id);
  }
  get_calendarProEs(id){
    return this.http.get<CalendarProEs>(this.calendarProUrl+'/calendarProEs/'+id);
  }
  getCalendarGroupCalendarsProEs(id){
    return this.http.get<CalendarProEs[]>(this.calendarProUrl+'/calendarGroup/'+id);
  }
  deleteSeance(seanceId:string){
    return this.http.put<{}>(this.calendarProUrl+'/deleteSeance/'+seanceId,{});

  }
  createVacation(vacation:Vacation,calendarProId:string){
    return this.http.put<{}>(this.calendarProUrl+'/createVacation/'+calendarProId,vacation);

  }
  updateSeances(calendarProId:string,calendarPro:CalendarPro){
    return this.http.put<CalendarPro>(this.calendarProUrl+'/updateSeances/'+calendarProId,calendarPro).toPromise();

  }
  updateInfo(calendarProId:string,calendarPro:CalendarPro){
    return this.http.put<CalendarPro>(this.calendarProUrl+'/updateInfo/'+calendarProId,calendarPro).toPromise();

  }
  updateEnabled(calendarProId:string){

    return this.http.put<{}>(this.calendarProUrl+'/changeEnabled/'+calendarProId,{});

  }
  addSeance(seanceEs:SeanceEs){
    return this.http.post<{}>(this.calendarProUrl+'/addSeance',seanceEs);

  }
  addValidity(date:Date,calendarProId:string){
    return this.http.post<{}>(this.calendarProUrl+'/addValidity/'+calendarProId,date);

  }

  uploadImage(formData: FormData, id: string) {
    return this.http.put<any>(this.calendarProUrl+'/'+id+'/upload',formData)
  }
  userFeed(page,size){
    return this.http.post<{content:CalendarProEs[],totalPages}>(this.calendarProUrl+'/feed?page='+page+'&size='+size,{})
  }
  follow(calendarProId){
    return this.http.post<Follows>(this.calendarProUrl+'/follow/'+calendarProId,{})
  }
  Unfollow(followId){
    return this.http.post<{}>(this.calendarProUrl+'/unfollow/'+followId,{})
  }
  userFollows(){
    return this.http.get<Follows[]>(this.calendarProUrl+'/user/follow');
  }
  userFollowCalendar(id){
    return this.http.get<Follows>(this.calendarProUrl+'/user/follow/'+id);
  }
  deleteComment(id){
    return this.http.delete(this.calendarProUrl+'/comment/'+id);
  }
  addComment(id,comment:CommentEs){
    return this.http.post<{}>(this.calendarProUrl+'/comment/'+id,comment);
  }
  getSeanceComments(id:string){
    return this.http.get<any>(this.calendarProUrl+'/SeanceComments/'+id);
  }
}
