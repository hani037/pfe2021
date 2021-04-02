import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import {MatDialog} from "@angular/material/dialog";
import {AddEventComponent} from '../add-event/add-event.component';
import {Subject} from 'rxjs';
import {event} from "../model/event";
import {EventService} from "../service/event.service";
import {UserService} from "../service/user.service";
@Component({
  selector: 'app-calendar-profile',
  templateUrl: './calendar-profile.component.html',
  styleUrls: ['./calendar-profile.component.css']
})
export class CalendarProfileComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  loading:boolean=true;

  events_user:event[];
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  activeDayIsOpen: boolean = true;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="ni ni-calendar-grid-58"></i>',
      a11yLabel: 'prendre un rendez-vous',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      }
    },
  ];
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#031cff',
      secondary: '#82fffd'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  events: CalendarEvent[]=[];
  constructor(private dialog: MatDialog,private eventService:EventService,private userService:UserService) { }

  ngOnInit(): void {
    this.eventService.get_user_events().subscribe(data=>{
      console.log(data)
      this.events_user = data;
      this.events_user.forEach(event=>{
        this.events.push( {
          start: new Date(event.start),
          end:new Date(event.end),
          title: event.description,
          color:this.colors.blue,
          actions:this.actions
        },)
      });
      this.loading= false;
    });

  }





}
