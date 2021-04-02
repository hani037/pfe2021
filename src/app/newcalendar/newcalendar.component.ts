import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
@Component({
  selector: 'app-newcalendar',
  templateUrl: './newcalendar.component.html',
  styleUrls: ['./newcalendar.component.css']
})
export class NewcalendarComponent implements OnInit{
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  loading:boolean=true;
  INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    height:'85%',
    initialView: 'dayGridMonth',
    themeSystem:'bootstrap',
    // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot:false,
    events:this.INITIAL_EVENTS,
    longPressDelay:1,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventAdd:this.handleEvents.bind(this),


    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  constructor(private dialog: MatDialog,private eventService:EventService,private appointmentService:AppointmentService) {
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
        data:{start:selectInfo.start,end:selectInfo.end}
      })
    }


  }

  handleEventClick(clickInfo: EventClickArg) {

    if(clickInfo.event.title.includes("appointment")){
      this.dialog.open(AppointmentComponent, {
        height: '300px',
        width: '350px',
        backdropClass: 'backdropBackground',
        data:{id: clickInfo.event.id}
      })
    }else {
      this.dialog.open(EventComponent, {
        height: '400px',
        width: '350px',
        backdropClass: 'backdropBackground',
        data:{id: clickInfo.event.id}
      })
    }
  }

  handleEvents(events: EventApi[]) {

  }

  ngOnInit(): void {
    this.eventService.eventEmitter.subscribe(data=> {
      if(data){
        this.get_events_appointments().subscribe(data => {
          this.calendarOptions.events = this.INITIAL_EVENTS
        })
      }
    });
  this.get_events_appointments().subscribe(data =>   this.calendarOptions.initialEvents = this.INITIAL_EVENTS);

  }
  get_events_appointments(){
    this.INITIAL_EVENTS = [];
    return this.eventService.get_user_events().pipe(mergeMap(data=>{
      data.forEach(event=>{
        this.INITIAL_EVENTS.push( {
          start: event.start,
          end:event.end,
          title: event.description,
          id:event.id,
          color:event.color,
        },)
      });
      return  this.appointmentService.getUserAppointment();
    }),map(data=>{
      data.forEach(data=>{
        let date =data.date.split('-')
        let time =data.time.split(':')
        this.INITIAL_EVENTS.push( {
          start: new Date(+date[2],+date[1]-1,+date[0],+time[0],+time[1]),
          end:new Date(+date[2],+date[1]-1,+date[0],+time[0],+time[1]+(+data.duration)),
          title: 'appointment',
          id:data.id,
          color:'blue',
        },)

      });
      this.loading= false;
    }));
  }
  add_event() {
    this.dialog.open(AddEventComponent, {
      height: '600px',
      width: '500px',
      backdropClass: 'backdropBackground'
    })
  }
}
