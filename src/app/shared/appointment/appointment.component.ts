import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AppointmentService} from "../service/appointment.service";
import {Appointment} from "../model/appointment";
import {CalendarPro} from "../model/CalendarPro";
import {CalendarProService} from "../service/calendarPro.service";
import {map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  is_loading:boolean=true;
  appointment:Appointment;
  calendarPro:CalendarPro;
  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {id:string},private appointmentService:AppointmentService,private calendarProService:CalendarProService) { }

  ngOnInit(): void {
  this.getAppointment()
  }

  private getAppointment() {

    this.appointmentService.getAppointment(this.data.id).pipe(mergeMap(data=>{
      this.appointment=data;
      return this.calendarProService.get_calendarPro(this.appointment.calendarProId)
    }),map(data=>{
      this.calendarPro = data;
    })).subscribe(data=>this.is_loading =false);
  }
}
