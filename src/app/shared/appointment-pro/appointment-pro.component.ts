import {Component, Inject, OnInit} from '@angular/core';
import {Appointment} from "../model/appointment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppointmentService} from "../service/appointment.service";

@Component({
  selector: 'app-appointment-pro',
  templateUrl: './appointment-pro.component.html',
  styleUrls: ['./appointment-pro.component.css']
})
export class AppointmentProComponent implements OnInit {
  is_loading:boolean= true;
  appointment:Appointment;
  constructor(private dialogRef: MatDialogRef<AppointmentProComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id:string},private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.getAppointment()
  }

  private getAppointment() {
    this.appointmentService.getAppointment(this.data.id).subscribe(data=>{
      this.appointment=data;
      console.log(data)
      this.is_loading = false;
    })
  }

  save(value: any) {

    this.is_loading= true;
    this.appointmentService.UpdateStatusAppointment(this.appointment.id,value,this.appointment).subscribe(data=>{
      this.dialogRef.close(value);
    })
  }
}
