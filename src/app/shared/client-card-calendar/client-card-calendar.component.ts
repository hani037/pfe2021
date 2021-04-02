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

@Component({
  selector: 'app-client-card-calendar',
  templateUrl: './client-card-calendar.component.html',
  styleUrls: ['./client-card-calendar.component.css']
})
export class ClientCardCalendarComponent implements OnInit {

  @Input() userName:string;
  @Input() address:string;
  @Input() Events_Client:event[];
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


    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  constructor(private dialog: MatDialog,private userService:UserService) {

  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {

  }
  ngOnInit(): void {
    this.Events_Client.forEach(event=>{
      this.INITIAL_EVENTS.push( {
        start: new Date(event.start),
        end:new Date(event.end),
        color:'red',
      },)
    })
    this.loading = false;
  }


  handleEventClick(clickInfo: EventClickArg) {

    let day = ("0" + clickInfo.event.start.getDate()).slice(-2);
    let month = ("0" + (clickInfo.event.start.getMonth()+1 )).slice(-2);
    let year = clickInfo.event.start.getFullYear();
    const date =day + "-" + month + "-" + year  ;
    let minute = '0'+clickInfo.event.start.getMinutes();
    if(clickInfo.event.start.getMinutes()<10){
      minute = '0'+clickInfo.event.start.getMinutes();
    }
    const time =clickInfo.event.start.getHours() + ":" + minute;
    const appointment = new Appointment()
    appointment.date = date ;
    appointment.duration = '30' ;
    appointment.userProId = 'aaa' ;
    appointment.userId = this.userService.userConnected.id ;
    appointment.time = time ;
    this.dialog.open(ConfirmationComponent, {
      height: '600px',
      width: '600px',
      backdropClass: 'backdropBackground',
      data :{appointment:appointment}
    })

  }

  handleEvents(events: EventApi[]) {

  }

}
