import { Component, OnInit } from '@angular/core';
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {CalendarPersonal} from "../model/calendarPersonal";
import {CalendarPro} from "../model/CalendarPro";
import {CalendarGroup} from "../model/calendarGroup";
import {EventService} from "../service/event.service";
import {CalendarPersonalService} from "../service/calendar-personal.service";
import {MatDialog} from "@angular/material/dialog";
import {CalendarProService} from "../service/calendarPro.service";
import {Router} from "@angular/router";
import {CalendarGroupService} from "../service/calendar-group.service";
import {AddCalendarComponent} from "../add-calendar/add-calendar.component";
import {map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'calendar_today'
    },
    {
      id: 2,
      icon: 'groups'
    },
    {
      id: 3,
      icon: 'work'
    }
  ];
  calendarsPersonal:CalendarPersonal[];
  calendarsPro:CalendarPro[];
  calendarsGroup:CalendarGroup[];

  loading:boolean=true;

  constructor(private eventService:EventService,private calendarPersonalService:CalendarPersonalService,private dialog: MatDialog
    ,private calendarProService:CalendarProService,private router:Router,private calendarGroupService:CalendarGroupService) { }

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
    }if(event == 2){
      this.router.navigateByUrl('config/CreateCalendarGroup')
    }if(event == 3){
      this.router.navigateByUrl('config/calendarPro')

    }

  }

  private getCalendars() {
    this.calendarPersonalService.get_user_calendars().pipe(mergeMap(data => {
      this.calendarsPersonal = data;
      return this.calendarProService.get_user_calendarsPro()
    }),mergeMap(data=>{
      this.calendarsPro =data;
      return this.calendarGroupService.get_user_calendarsGroup()
    }),map(data=>{
      this.calendarsGroup =data;
    })).subscribe(data=>this.loading = false)

  }
}
