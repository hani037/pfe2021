import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {event} from "../model/event";
import {CalendarEvent, CalendarEventAction, CalendarView} from "angular-calendar";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../service/user.service";
import {Appointment} from "../model/appointment";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
  FullCalendarComponent
} from "@fullcalendar/angular";
import {AddEventComponent} from "../add-event/add-event.component";
import {AppointmentComponent} from "../appointment/appointment.component";
import {EventComponent} from "../event/event.component";
import {DayScheduleEs} from "../model/DayScheduleEs";
import {Seance} from "../model/seance";

@Component({
  selector: 'app-client-card-calendar',
  templateUrl: './client-card-calendar.component.html',
  styleUrls: ['./client-card-calendar.component.css']
})
export class ClientCardCalendarComponent implements OnInit {

  @Input() firstName:string;
  @Input() lastName:string;
  @Input() address:string;
  @Input() daysSchedule:DayScheduleEs[];
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  loading:boolean=false;
  INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    themeSystem:'',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    slotMinTime:'06:00:00',
    slotMaxTime:'24:00:00',
    initialView: 'timeGridWeek',
    height:'400px',
    // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    events:this.INITIAL_EVENTS,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot:false,
    longPressDelay:1,
    eventClick: this.handleEventClick.bind(this),

  };
  constructor(private dialog: MatDialog,private userService:UserService) {

  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {

  }
  ngOnInit(): void {
    this.daysSchedule.forEach(dayScheduleEs=>{
      let today =new Date();
      today.setHours(0)
      if(new Date(dayScheduleEs.date).getTime() < today.getTime()){
      return;
      }
      dayScheduleEs.seances.forEach(seance =>{
        let seanceTime =new Date();
        if(new Date(dayScheduleEs+" "+seance.start).getTime() < seanceTime.getTime()){
          return;
        }
        this.INITIAL_EVENTS.push( {
          start: new Date(dayScheduleEs+" "+seance.start),
          end:new Date(dayScheduleEs+" "+seance.end),
          color:'red',
        },)
      })
    })
    this.loading = false;
  }


  handleEventClick(clickInfo: EventClickArg) {

    let day = ("0" + clickInfo.event.start.getDate()).slice(-2);
    let month = ("0" + (clickInfo.event.start.getMonth()+1 )).slice(-2);
    let year = clickInfo.event.start.getFullYear();
    const date =year + "-" + month + "-" + day  ;
    let MinStart = clickInfo.event.start.getMinutes().toString();
    let MinEnd = clickInfo.event.end.getMinutes().toString();
    let HStart = clickInfo.event.start.getHours().toString();
    let HEnd = clickInfo.event.end.getHours().toString();
    if(clickInfo.event.start.getMinutes()<10){
      MinStart = '0'+clickInfo.event.start.getMinutes();
    }
    if(clickInfo.event.end.getMinutes()<10){
      MinEnd = '0'+clickInfo.event.end.getMinutes();
    }
    if(clickInfo.event.start.getHours()<10){
      HStart = '0'+clickInfo.event.start.getHours();
    }
    if(clickInfo.event.end.getHours()<10){
      HEnd = '0'+clickInfo.event.end.getHours();
    }
    const StartTime =HStart + ":" + MinStart;
    const endTime = HEnd + ":" + MinEnd;
    const appointment = new Appointment();
    appointment.date = date ;
    appointment.calendarProId = this.daysSchedule[0].calendarProId ;
    appointment.userId = this.userService.userConnected.id ;
    appointment.seance = new Seance();
    appointment.seance.start =  date+" "+StartTime ;
    appointment.seance.end = date+" "+endTime ;
    this.dialog.open(ConfirmationComponent, {
      height: '250px',
      width: '300px',
      backdropClass: 'backdropBackground',
      data :{appointment:appointment}
    })

  }

  handleEvents(events: EventApi[]) {

  }

}
