import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalendarOptions, EventClickArg, EventInput} from "@fullcalendar/angular";
import {CalendarProService} from "../service/calendar-pro.service";
import {CalendarPro} from "../model/CalendarPro";
import {CalendarProEs} from "../model/CalendarProEs";
import {map, mergeMap} from "rxjs/operators";
import {AppointmentComponent} from "../appointment/appointment.component";
import {EventComponent} from "../event/event.component";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentProComponent} from "../appointment-pro/appointment-pro.component";
import {SeanceProComponent} from "../seance-pro/seance-pro.component";

@Component({
  selector: 'app-calendar-pro',
  templateUrl: './calendar-pro.component.html',
  styleUrls: ['./calendar-pro.component.css']
})
export class CalendarProComponent implements OnInit {
  loading=true;
  calendarProEs:CalendarProEs;
  calendarPro:CalendarPro;
  INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {

    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
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
            start: appointment.seance.start,
            end:appointment.seance.end,
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
        height: '300px',
        width: '350px',
        backdropClass: 'backdropBackground',
        data:{id: clickInfo.event.id}
      })
    }else {
      this.dialog.open(SeanceProComponent, {
        height: '400px',
        width: '350px',
        backdropClass: 'backdropBackground',
        data:{seance: {start:clickInfo.event.start, end:clickInfo.event.end}}
      })
    }
  }
}
