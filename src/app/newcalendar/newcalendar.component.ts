import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import {map, mergeMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {EventService} from "../shared/service/event.service";
import {AppointmentService} from "../shared/service/appointment.service";
import {AddEventComponent} from "../shared/add-event/add-event.component";
import {AppointmentComponent} from "../shared/appointment/appointment.component";
import {EventComponent} from "../shared/event/event.component";
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as Events from "events";
import {CalendarPersonalService} from "../shared/service/calendar-personal.service";
import {AddCalendarComponent} from "../shared/add-calendar/add-calendar.component";
import {event} from "../shared/model/event";
import {Appointment} from "../shared/model/appointment";
import {ActivatedRoute, Route} from "@angular/router";
import {CalendarPersonal} from "../shared/model/calendarPersonal";

interface MatFabMenu {
  id: string | number;
  icon?: string; // please use either icon or imgUrl

}
@Component({
  selector: 'app-newcalendar',
  templateUrl: './newcalendar.component.html',
  styleUrls: ['./newcalendar.component.css']
})
export class NewcalendarComponent implements OnInit{
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  calendarPersonal:CalendarPersonal;
  loading:boolean=true;
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'celebration'
    }
  ];
  INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },

    initialView: 'dayGridMonth',
    slotMinTime:'06:00:00',
    slotMaxTime:'24:00:00',
    height:"auto",
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot:false,
    initialEvents:this.INITIAL_EVENTS,
    longPressDelay:1,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventAdd:this.handleEvents.bind(this),


  };
    constructor(private activatedRoute: ActivatedRoute,private dialog: MatDialog,private eventService:EventService,private appointmentService:AppointmentService,private calendarPersonalService:CalendarPersonalService) {
    if(window.innerWidth < 768){
      this.calendarOptions.headerToolbar = {
        left: 'prev',
        center: 'title dayGridMonth,timeGridDay,timeGridWeek',
        right: 'next',

      }
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth < 768) {
      this.calendarOptions.headerToolbar = {
        left: 'prev',
        center: 'title dayGridMonth,timeGridDay,timeGridWeek',
        right: 'next',

      }
    }else {
      this.calendarOptions.headerToolbar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'

      }
    }
  }
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    if(selectInfo.view.type =='dayGridMonth'){
      this.fullcalendar.getApi().changeView('timeGridDay',selectInfo.start)
    }else{
      this.dialog.open(AddEventComponent, {
        height: '600px',
        width: '500px',
        backdropClass: 'backdropBackground',
        data:{start:selectInfo.start,end:selectInfo.end,calendarId: this.calendarPersonal.id}
      })
    }


  }

  handleEventClick(clickInfo: EventClickArg) {

    if(clickInfo.event.extendedProps.type=='Appointment'){
      this.dialog.open(AppointmentComponent, {

        backdropClass: 'backdropBackground',
        data:{id: clickInfo.event.id}
      })
    }else {
      this.dialog.open(EventComponent, {

        backdropClass: 'backdropBackground',
        data:{id: clickInfo.event.id}
      })
    }
  }

  handleEvents(events: EventApi[]) {

  }

  ngOnInit(): void {
    this.getCalendar();
    this.eventService.eventEmitter.subscribe(data=> {
      if(data){

        this.getCalendar();
      }
    });

  }
  getCalendar(){
    this.calendarPersonalService.get_calendar(this.activatedRoute.snapshot.params['id']).subscribe(data=>{
      this.calendarPersonal =data;
      this.INITIAL_EVENTS = [];
      this.calendarPersonal.events.forEach(event=>{
        this.INITIAL_EVENTS.push( {
          start: event.start,
          end:event.end,
          title: event.description,
          id:event.id,
          color:event.color,
          extendedProps: {
            type: 'Event'
          },
        },)
      });
      this.calendarPersonal.appointment.forEach(appointment=>{
        this.INITIAL_EVENTS.push( {
          start: appointment.start,
          end:appointment.end,
          title: "Appointment",
          id:appointment.id,
          color:"Blue",
          extendedProps: {
            type: 'Appointment'
          },
        },)
      });
      this.calendarOptions.events = this.INITIAL_EVENTS;
      this.loading = false;
    })

  }
  getCalendarByID(id){
    this.INITIAL_EVENTS = [];
    return this.calendarPersonalService.get_calendar(id).pipe(map(data=> {
      data.events.forEach(event => {
        this.INITIAL_EVENTS.push({
          start: event.start,
          end: event.end,
          title: event.description,
          id: event.id,
          color: event.color,
          extendedProps: {
            type: 'Event'
          },
        },)
      })
      data.appointment.forEach(appointment=>{
        this.INITIAL_EVENTS.push( {
          start: appointment.start,
          end:appointment.end,
          title: "Appointment",
          id:appointment.id,
          color:"Blue",
          extendedProps: {
            type: 'Appointment'
          },
        },)
      });
    }))
  }
  add_event() {
    this.dialog.open(AddEventComponent, {

      backdropClass: 'backdropBackground',
      data:{calendarId: this.calendarPersonal.id}
    })
  }


  add(event) {
    if(event ==1){
      this.add_event();
    }
  }
}
