import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {CalendarGroup} from "../../shared/model/calendarGroup";
import {ActivatedRoute} from "@angular/router";
import {CalendarGroupService} from "../../shared/service/calendar-group.service";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {CalendarProEs} from "../../shared/model/CalendarProEs";
import {CalendarPro} from "../../shared/model/CalendarPro";
import {CalendarOptions, EventClickArg, EventInput} from "@fullcalendar/angular";
import {map, mergeMap} from "rxjs/operators";
import {AppointmentProComponent} from "../../shared/appointment-pro/appointment-pro.component";
import {SeanceProComponent} from "../../shared/seance-pro/seance-pro.component";
import {CreateVacationComponent} from "../../shared/create-vacation/create-vacation.component";
import {AddSeanceComponent} from "../../shared/add-seance/add-seance.component";
import {AddValidityComponent} from "../../shared/add-validity/add-validity.component";
import {CalendarProService} from "../../shared/service/calendarPro.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-calendar-group',
  templateUrl: './calendar-group.component.html',
  styleUrls: ['./calendar-group.component.css']
})
export class CalendarGroupComponent implements OnInit {
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
  id:string;
  nb:number=0;
  calendarGroup:CalendarGroup;


  constructor(private activatedRoute: ActivatedRoute,private calendarGroupService:CalendarGroupService
              ,private calendarProService:CalendarProService,private dialog: MatDialog,@Inject(LOCALE_ID) public locale: string) {
    this.calendarOptions.locale = this.locale;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.calendarGroupService.get_calendar(this.id).subscribe(data=>{
      this.calendarGroup = data;
      this.getCalendar();
    })
  }
  getCalendar(){
    this.calendarProService.get_calendarProEs(this.calendarGroup.calendarProList[this.nb].id).pipe(mergeMap(data=> {
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

  changeCalendar() {
    this.getCalendar();
  }
}
