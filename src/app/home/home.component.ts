import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CalendarPersonalService} from "../shared/service/calendar-personal.service";
import {CalendarPersonal} from "../shared/model/calendarPersonal";
import {EventService} from "../shared/service/event.service";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {AddCalendarComponent} from "../shared/add-calendar/add-calendar.component";
import {MatDialog} from "@angular/material/dialog";
import {CalendarPro} from "../shared/model/CalendarPro";
import {map, mergeMap} from "rxjs/operators";
import {CalendarProService} from "../shared/service/calendarPro.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'calendar_today'
    }
  ];
  calendarsPersonal:CalendarPersonal[];
  calendarsPro:CalendarPro[];

  loading:boolean=true;

  constructor(private eventService:EventService,private calendarPersonalService:CalendarPersonalService,private dialog: MatDialog
              ,private calendarProService:CalendarProService) { }

  ngOnInit(): void {
    this.getCalendars();
    this.calendarPersonalService.CalendarEmitter.subscribe(data=> {
      if(data){
        this.getCalendar();
      }
    });

  }
  getCalendar(){
    this.calendarPersonalService.get_user_calendars().subscribe(data => {
      this.calendarsPersonal = data;
      this.loading = false;
    })
  }

  add(event) {
    if(event ==1){
      this.dialog.open(AddCalendarComponent, {
        height: '200px',
        width: '300px',
        backdropClass: 'backdropBackground',
      })
    }

    }

  private getCalendars() {
    this.calendarPersonalService.get_user_calendars().pipe(mergeMap(data => {
      this.calendarsPersonal = data;
      return this.calendarProService.get_user_calendarsPro()
    }),map(data=>{
      this.calendarsPro =data;
    })).subscribe(data=>this.loading = false)

  }
}
