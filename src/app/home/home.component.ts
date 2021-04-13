import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CalendarPersonalService} from "../shared/service/calendar-personal.service";
import {CalendarPersonal} from "../shared/model/calendarPersonal";
import {EventService} from "../shared/service/event.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  calendarsPersonal:CalendarPersonal[];
  calendarPersonal:CalendarPersonal;
  Nb:number=0;
  loading:boolean=true;

  constructor(private eventService:EventService,private calendarPersonalService:CalendarPersonalService) { }

  ngOnInit(): void {
    this.calendarPersonalService.CalendarEmitter.subscribe(data=> {
      if(data){
        this.getCalendar();
      }
    });
    this.getCalendar();
  }
  getCalendar(){
    this.calendarPersonalService.get_user_calendars().subscribe(data => {

      this.calendarsPersonal = data;
      this.calendarPersonal = this.calendarsPersonal[this.Nb];
      this.loading = false;
    })
  }
  right() {
  if(this.Nb==this.calendarsPersonal.length-1){
    this.Nb = 0;
  }else {
    this.Nb ++;
  }
    this.calendarPersonal = this.calendarsPersonal[this.Nb];
    this.calendarPersonalService.changeEmitter.next(this.calendarPersonal.id)
  }

  left() {
    if(this.Nb==0){
      this.Nb = this.calendarsPersonal.length-1;
    }else {
      this.Nb --;
    }
    this.calendarPersonal = this.calendarsPersonal[this.Nb];
    this.calendarPersonalService.changeEmitter.next(this.calendarPersonal.id)

  }
}
