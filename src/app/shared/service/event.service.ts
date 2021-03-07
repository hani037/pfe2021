import { Injectable } from '@angular/core';
import {event} from "../model/event";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsUrl = '/api/v1/events';
  //events:event[]=[{start:'2021-02-22T08:00:00.000Z',end:'2021-02-22T14:00:00.000Z',description:'aaa'}];
  constructor(private http:HttpClient) { }
  get_user_events(){
    return this.http.get<event[]>(this.eventsUrl);
  }
  create_user_events(event){
    return this.http.post<event>(this.eventsUrl,event);
  }
  updateEvent(event){
    return this.http.put<event>(this.eventsUrl,event);
  }
  get_event_by_id(id:string){
    return this.http.get<event>(this.eventsUrl+'/'+id);
  }
  delete_event(id:string){
    return this.http.delete(this.eventsUrl+'/'+id);
  }
}
