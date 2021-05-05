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
import {JoinComponent} from "../join/join.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {ActivatedRoute, NavigationEnd, NavigationStart, Route, Router} from "@angular/router";

@Component({
  selector: 'app-client-card-calendar',
  templateUrl: './client-card-calendar.component.html',
  styleUrls: ['./client-card-calendar.component.css']
})
export class ClientCardCalendarComponent implements OnInit {
  route_active='';
  @Input() firstName:string;
  @Input() userId:string;
  @Input() lastName:string;
  @Input() address:string;
  @Input() daysSchedule:DayScheduleEs[];
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  loading:boolean=false;
  INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
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
  constructor(private activatedRoute: ActivatedRoute,private dialog: MatDialog,private userService:UserService,public router:Router) {
    this.route_active = this.activatedRoute.snapshot.url[0].path;
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
    if(this.userService.userConnected.id){
      let day = ("0" + clickInfo.event.start.getDate()).slice(-2);
      let month = ("0" + (clickInfo.event.start.getMonth()+1 )).slice(-2);
      let year = clickInfo.event.start.getFullYear();
      const date =year + "-" + month + "-" + day  ;
      let MinStart = ("0" +clickInfo.event.start.getMinutes().toString()).slice(-2);
      let MinEnd = ("0" +clickInfo.event.end.getMinutes().toString()).slice(-2);
      let HStart = ("0" +clickInfo.event.start.getHours().toString()).slice(-2);
      let HEnd = ("0" +clickInfo.event.end.getHours().toString()).slice(-2);
      const StartTime =HStart + ":" + MinStart;
      const endTime = HEnd + ":" + MinEnd;
      const appointment = new Appointment();
      appointment.date = date ;
      appointment.calendarProId = this.daysSchedule[0].calendarProId ;
      appointment.userId = this.userService.userConnected.id ;
      appointment.start =  date+" "+StartTime ;
      appointment.end = date+" "+endTime ;
      this.dialog.open(ConfirmationComponent, {
        height: '250px',
        width: '300px',
        backdropClass: 'backdropBackground',
        data :{appointment:appointment}
      })
    }else {
      this.dialog.open(LoginDialogComponent, {

        backdropClass: 'backdropBackground',
      })
    }


  }

  handleEvents(events: EventApi[]) {

  }

  profile() {
    this.router.navigateByUrl('profile/'+this.userId);
  }
}
