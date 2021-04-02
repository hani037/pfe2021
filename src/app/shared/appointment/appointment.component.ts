import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AppointmentService} from "../service/appointment.service";
import {Appointment} from "../model/appointment";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  is_loading:boolean=false;
  appointment:Appointment;
  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {id:string},private appointmentService:AppointmentService) { }

  ngOnInit(): void {
  this.getAppointment()
  }

  private getAppointment() {
    this.appointmentService.getAppointment(this.data.id).subscribe(data=>{
      this.appointment=data;
      this.is_loading = true
    })
  }
}
