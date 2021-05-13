import {Component, Inject, OnInit} from '@angular/core';
import {Appointment} from "../model/appointment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppointmentService} from "../service/appointment.service";
import {AppointmentCalendarPro} from "../model/appointmentCalendarPro";

@Component({
  selector: 'app-appointment-pro',
  templateUrl: './appointment-pro.component.html',
  styleUrls: ['./appointment-pro.component.css']
})
export class AppointmentProComponent implements OnInit {
  is_loading:boolean= true;
  appointment:AppointmentCalendarPro;
  constructor(private dialogRef: MatDialogRef<AppointmentProComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id:string},private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.getAppointment()
  }

  private getAppointment() {
    this.appointmentService.getAppointmentCalendarPro(this.data.id).subscribe(data=>{
      console.log(data)
      this.appointment=data;
      this.is_loading = false;
    })
  }

  save(value: any,appointment:Appointment) {

    this.is_loading= true;
    this.appointmentService.UpdateStatusAppointment(appointment.id,value,appointment).subscribe(data=>{
      if(value=="CANCELED"&&this.appointment.appointmentList.length==1){
        this.dialogRef.close('deleted')
      }else {
        this.getAppointment()

      }
    })
  }

  changeAll(status: string) {
    this.is_loading= true;
    this.appointmentService.updateAll(this.appointment.id,status).subscribe(data=>{
      this.dialogRef.close('deleted');
    })
  }
}
