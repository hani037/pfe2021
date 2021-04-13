import {Injectable, Output} from '@angular/core';
import {event} from "../model/event";
import {HttpClient} from "@angular/common/http";
import * as EventEmitter from "events";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsUrl = '/api/v1/events';
  eventEmitter = new BehaviorSubject<boolean>(false);
  //events:event[]=[{start:'2021-02-22T08:00:00.000Z',end:'2021-02-22T14:00:00.000Z',description:'aaa'}];
  constructor(private http:HttpClient) { }
  get_user_events(){
    return this.http.get<event[]>(this.eventsUrl);
  }
  addEvent(event,id){
    return this.http.post<event>(this.eventsUrl+'/'+id,event);
  }
  updateEvent(event,newContacts){
    return this.http.put<event>(this.eventsUrl,{event,newContacts});
  }
  get_event_by_id(id:string){
    return this.http.get<event>(this.eventsUrl+'/'+id);
  }
  delete_event(id:string){
    return this.http.delete(this.eventsUrl+'/'+id);
  }
  uploadImage(formData,id){
    return this.http.put<any>(this.eventsUrl+'/'+id+'/upload',formData)
  }
}
