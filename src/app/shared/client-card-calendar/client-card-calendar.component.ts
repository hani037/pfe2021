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

import {Seance} from "../model/seance";
import {JoinComponent} from "../join/join.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {ActivatedRoute, NavigationEnd, NavigationStart, Route, Router} from "@angular/router";
import {DateService} from "../service/date.service";
import {SeanceEs} from "../model/SeanceEs";
import {CalendarPro} from "../model/CalendarPro";
import {CalendarProEs} from "../model/CalendarProEs";
import {CalendarProService} from "../service/calendarPro.service";
import {Follows} from "../model/follows";

@Component({
  selector: 'app-client-card-calendar',
  templateUrl: './client-card-calendar.component.html',
  styleUrls: ['./client-card-calendar.component.css']
})
export class ClientCardCalendarComponent implements OnInit {
  route_active='';

  @Input() calendarPro:CalendarProEs;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  loading:boolean=false;
  INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  is_follow=false;
  follows:Follows;
  calendarOptions: CalendarOptions = {

    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    slotMinTime:'06:00:00',
    slotMaxTime:'24:00:00',
    initialView: 'timeGridWeek',
    height:'auto',
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
  constructor(private activatedRoute: ActivatedRoute,private dialog: MatDialog,private userService:UserService,public router:Router,public dateService:DateService,
  private calendarProService:CalendarProService) {
    this.route_active = this.activatedRoute.snapshot.url[0].path;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {

  }
  ngOnInit(): void {
    this.calendarPro.seanceEsList.forEach(seance=>{
      let today =new Date();
      today.setHours(0)
      if(new Date(seance.date).getTime() < today.getTime()){
        return;
      }
      this.INITIAL_EVENTS.push( {
        start: new Date(seance.date +" " +seance.start),
        end:new Date(seance.date +" " +seance.end),
        color:'red',
        extendedProps: {
          seance: seance
        },
      },)
    })

    this.calendarProService.userFollowCalendar(this.calendarPro.id).subscribe(data=>{
      this.follows = data;
      this.loading = false;
    })
  }


  handleEventClick(clickInfo: EventClickArg) {
    if(this.userService.userConnected.id){
      const appointment = new Appointment();
      appointment.date = this.dateService.getDate(clickInfo.event.start) ;
      appointment.calendarProId = this.calendarPro.id ;
      appointment.userId = this.userService.userConnected.id ;
      appointment.start =   clickInfo.event.extendedProps.seance.start ;
      appointment.end =  clickInfo.event.extendedProps.seance.end ;
      this.dialog.open(ConfirmationComponent, {
        backdropClass: 'backdropBackground',
        data :{appointment:appointment ,seance:clickInfo.event.extendedProps.seance}
      })
    }else {
      this.dialog.open(LoginDialogComponent, {

        backdropClass: 'backdropBackground',
      })
    }


  }

  handleEvents(events: EventApi[]) {

  }

  group() {
    this.router.navigateByUrl('group/'+this.calendarPro.calendarGroupId);
  }

  follow() {
  this.calendarProService.follow(this.calendarPro.id).subscribe(data=>{
    this.follows =data;
  })
  }

  unfollow() {
    this.calendarProService.Unfollow(this.follows.id).subscribe(data=>this.follows=null)
  }
}
