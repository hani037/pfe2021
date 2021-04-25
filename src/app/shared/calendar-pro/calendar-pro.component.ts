import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalendarOptions, EventClickArg, EventInput} from "@fullcalendar/angular";
import {CalendarProService} from "../service/calendarPro.service";
import {CalendarPro} from "../model/CalendarPro";
import {CalendarProEs} from "../model/CalendarProEs";
import {map, mergeMap} from "rxjs/operators";
import {AppointmentComponent} from "../appointment/appointment.component";
import {EventComponent} from "../event/event.component";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentProComponent} from "../appointment-pro/appointment-pro.component";
import {SeanceProComponent} from "../seance-pro/seance-pro.component";
import {SeanceEs} from "../model/SeanceEs";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {AddCalendarComponent} from "../add-calendar/add-calendar.component";
import {CreateVacationComponent} from "../create-vacation/create-vacation.component";

@Component({
  selector: 'app-calendar-pro',
  templateUrl: './calendar-pro.component.html',
  styleUrls: ['./calendar-pro.component.css']
})
export class CalendarProComponent implements OnInit {
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'beach_access'
    }
  ];
  loading=true;
  calendarProEs:CalendarProEs;
  calendarPro:CalendarPro;
  INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {

    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay,listWeek'
    },

    initialView: 'timeGridWeek',
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
    eventClick: this.handleEventClick.bind(this)


  };
  constructor(private activatedRoute: ActivatedRoute,private calendarProService:CalendarProService,private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getCalendar();
  }
  getCalendar(){
    this.calendarProService.get_calendarProEs(this.activatedRoute.snapshot.params['id']).pipe(mergeMap(data=> {
        this.calendarProEs = data;
        this.INITIAL_EVENTS = [];
        this.calendarProEs.dayScheduleEs.forEach(dayScheduleEs => {
          dayScheduleEs.seances.forEach(seance => {
            let seanceTime = new Date();
            if (new Date(dayScheduleEs + " " + seance.start).getTime() < seanceTime.getTime()) {
              return;
            }
            this.INITIAL_EVENTS.push({
              start: new Date(dayScheduleEs + " " + seance.start),
              end: new Date(dayScheduleEs + " " + seance.end),
              color: 'red',
            },)
          })
        });
        return this.calendarProService.get_calendarPro(this.calendarProEs.id)
      }
      ),map(data=>{
        this.calendarPro =data;
          this.calendarPro.appointment.forEach(appointment=>{
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
      })).subscribe()

  }
  handleEventClick(clickInfo: EventClickArg) {

    if(clickInfo.event.extendedProps.type=='Appointment'){
      this.dialog.open(AppointmentProComponent, {
        height: '250px',
        width: '350px',
        backdropClass: 'backdropBackground',
        data:{id: clickInfo.event.id}
      }).afterClosed().subscribe(data=>{
        if(data=="CANCELED"||data=="FINISHED"){
          this.getCalendar();
        }
      })
    }else {
      let seance = new SeanceEs();
      let date = ("0" + clickInfo.event.start.getDate()).slice(-2);
      let month = ("0" + (clickInfo.event.start.getMonth()+1 )).slice(-2);
      let year = clickInfo.event.start.getFullYear();
      let startHour = ("0" + (clickInfo.event.start.getHours() )).slice(-2);
      let startMin = ("0" + (clickInfo.event.start.getMinutes() )).slice(-2);
      let endHour = ("0" + (clickInfo.event.end.getHours() )).slice(-2);
      let endMin = ("0" + (clickInfo.event.end.getMinutes() )).slice(-2);
      seance.start =year + "-" + month + "-" + date + " " + startHour + ":"+startMin ;
      seance.end =year + "-" + month + "-" + date + " " + endHour + ":"+endMin ;
      this.dialog.open(SeanceProComponent, {
        height: '200px',
        width: '350px',
        backdropClass: 'backdropBackground',
        data:{seance: seance,calendarProId:this.calendarPro.id}
      }).afterClosed().subscribe(data=>{
        if(data){
          this.getCalendar();
        }
      })
    }
  }
  add(event) {
    if(event ==1){
      let start =new Date(this.calendarPro.startDate);
      if (start.getTime()<new Date().getTime()){
        start = new Date();
      }
      this.dialog.open(CreateVacationComponent, {
        height: '300px',
        width: '300px',
        backdropClass: 'backdropBackground',
        data:{start:start,end:new Date(this.calendarPro.expiryDate),id:this.calendarPro.id}
      }).afterClosed().subscribe(data=>{
        if(data){
          this.getCalendar();
        }
      })
    }

  }
}
