import { Injectable } from '@angular/core';
import {event} from "../model/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events:event[]=[{start:'2021-02-20T08:00:00.000Z',end:'2021-02-20T14:00:00.000Z',description:'aaa'}];
  constructor() { }
  get_user_events(id){
    return this.events;
  }
  create_user_events(id,event){
    this.events.push(event);
  }
}
