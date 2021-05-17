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
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import {DateService} from "../shared/service/date.service";
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
    plugins: [ rrulePlugin, dayGridPlugin ],

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
    constructor(private activatedRoute: ActivatedRoute,private dialog: MatDialog,private eventService:EventService,
                private appointmentService:AppointmentService,private calendarPersonalService:CalendarPersonalService,private dateService: DateService) {
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
    this.calendarPersonalService.get_calendar(this.activatedRoute.snapshot.params['id']).subscribe(async data=>{
      this.calendarPersonal =data;
      console.log(data)
      this.INITIAL_EVENTS = [];
      await this.calendarPersonal.events.forEach(event=>{
        if(!event.recurrence){
          this.INITIAL_EVENTS.push( {
            start: new Date(event.date +' '+event.start),
            end:new Date(event.date +' '+event.end),
            title: event.description,
            id:event.id,
            color:event.color,
            extendedProps: {
              type: 'Event'
            },
          },)
        }else{
          if(event.recurrenceType=="MONTHLY"||event.recurrenceType=="YEARLY") {
            console.log(new Date(event.date+' '+event.start))
            console.log(this.dateService.getDuration(event.start,event.end))
            this.INITIAL_EVENTS.push({
              title: event.description,
              id:event.id,
              color:event.color,
              extendedProps: {
                type: 'Event'
              },
              duration: this.dateService.getDuration(event.start,event.end),
              // RRULE:FREQ=MONTHLY;COUNT=13;WKST=MO;BYMONTHDAY=13,
              rrule: {
                freq: event.recurrenceType,
                dtstart: event.date+'T'+event.start,

              }
            })
          }else if(event.recurrenceType=="WEEKLY") {
            console.log('hi')
            this.INITIAL_EVENTS.push( {
              start: event.start,
              end:event.end,
              title: event.description,
              id:event.id,
              color:event.color,
              daysOfWeek: [event.date ],
              extendedProps: {
                type: 'Event'
              },
            })
          }else {
            console.log('hi')
            this.INITIAL_EVENTS.push( {
              start: event.start,
              end:event.end,
              title: event.description,
              id:event.id,
              color:event.color,
              daysOfWeek: [ '0','1','2','3','4','5','6' ],
              extendedProps: {
                type: 'Event'
              },
            })
          }
        }

      });
      this.calendarPersonal.appointment.forEach(appointment=>{
        this.INITIAL_EVENTS.push( {
          start: new Date(appointment.date +" "+appointment.start),
          end:new Date(appointment.date +" "+appointment.start),
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
/*
 events: [

      {
        title: 'my recurring event',
        duration: "01:50",
        // RRULE:FREQ=MONTHLY;COUNT=13;WKST=MO;BYMONTHDAY=13,
        rrule: {
          freq: 'yearly',
          dtstart: "2021-01-01T10:00:00.000Z",
        }
      },     {
        title: 'my recurring event',
        duration: "01:50",
        // RRULE:FREQ=MONTHLY;COUNT=13;WKST=MO;BYMONTHDAY=13,
        rrule: {
          freq: 'monthly',
          dtstart: "2021-01-01T10:00:00.000Z",

        }
      }
    ],
 */
