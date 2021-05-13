import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../model/appointment";
import {AppointmentService} from "../service/appointment.service";
import {CalendarPersonalService} from "../service/calendar-personal.service";
import {map} from "rxjs/operators";
import {CalendarPersonal} from "../model/calendarPersonal";
import {SeanceEs} from "../model/SeanceEs";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  appointment_Taken = false;
  is_loading = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  calendarPersonals:CalendarPersonal[];
  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>,private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {appointment:Appointment,seance:SeanceEs},private appointmentService:AppointmentService,private calendarPersonalService:CalendarPersonalService) {
  }

  ngOnInit() {
    console.log(this.data.seance)
    this.calendarPersonalService.get_user_calendars().subscribe(data=> {
    this.calendarPersonals = data;
    this.is_loading = false;
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  createAppointment(f: NgForm) {
    this.is_loading = true;
    this.data.appointment.calendarPersonalId = f.value.id;
    if(this.data.seance.nbPlacesAvailable == 1){
      this.data.appointment.nbPlaces = 1;
    }else {
      this.data.appointment.nbPlaces = f.value.places;
    }
    this.data.appointment.seanceId = this.data.seance.id;
    console.log(this.data.appointment);
    this.appointmentService.createAppointment(this.data.appointment).subscribe(data=>{
      if(data==null){
        this.appointment_Taken = true;
        this.is_loading = false;
      }else {
        this.appointmentService.AppointmentEmitter.next('created');
        this.dialogRef.close();
      }
  })
  }

  arrayOne(n: number): any[] {
    return Array(Math.abs(n));
  }

}
