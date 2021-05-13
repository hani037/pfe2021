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
import {DateService} from "../service/date.service";
import {AddSeanceComponent} from "../add-seance/add-seance.component";
import {AddValidityComponent} from "../add-validity/add-validity.component";

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
    },
    {
      id: 2,
      icon: 'schedule '
    },
    {
      id: 3,
      icon: 'event_available '
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
  constructor(private activatedRoute: ActivatedRoute,private calendarProService:CalendarProService,private dialog: MatDialog,private dateService:DateService ) { }

  ngOnInit(): void {
    this.getCalendar();
  }
  getCalendar(){
    this.calendarProService.get_calendarProEs(this.activatedRoute.snapshot.params['id']).pipe(mergeMap(data=> {
        this.calendarProEs = data;
        console.log(data);
        this.INITIAL_EVENTS = [];
        this.calendarProEs.seanceEsList.forEach(seance => {
          this.INITIAL_EVENTS.push({
              start: new Date(seance.date+" "+seance.start),
              end: new Date(seance.date+" "+seance.end),
              color: 'red',
              extendedProps: {
                seance: seance
              },
            },)
        });
        return this.calendarProService.get_calendarPro(this.calendarProEs.id)
      }
      ),map(data=>{
        this.calendarPro =data;
          this.calendarPro.appointment.forEach(appointment=>{
          this.INITIAL_EVENTS.push( {
            start: new Date(appointment.date +" " +appointment.start),
            end:new Date(appointment.date +" " +appointment.end),
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

        backdropClass: 'backdropBackground',
        data:{id: clickInfo.event.id}
      }).afterClosed().subscribe(data=>{
        if(data=="CANCELED"||data=="deleted"){
          this.getCalendar();
        }
      })
    }else {
      this.dialog.open(SeanceProComponent, {
        backdropClass: 'backdropBackground',
        data:{seance: clickInfo.event.extendedProps.seance,calendarProId:this.calendarPro.id}
      }).afterClosed().subscribe(data=>{
        if(data){
          this.getCalendar();
        }
      })
    }
  }
  add(event) {
    let start =new Date(this.calendarPro.startDate);
    if (start.getTime()<new Date().getTime()){
      start = new Date();
    }
    if(event ==1){

      this.dialog.open(CreateVacationComponent, {

        backdropClass: 'backdropBackground',
        data:{start:start,end:new Date(this.calendarPro.expiryDate),id:this.calendarPro.id}
      }).afterClosed().subscribe(data=>{
        if(data){
          this.getCalendar();
        }
      })
    }else  if(event ==2){

      this.dialog.open(AddSeanceComponent, {
        backdropClass: 'backdropBackground',
        data:{start:start,end:new Date(this.calendarPro.expiryDate),id:this.calendarPro.id}
      }).afterClosed().subscribe(data=>{
        if(data){
          this.getCalendar();
        }
      })
    }
    else  if(event ==3){
      this.dialog.open(AddValidityComponent, {
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
