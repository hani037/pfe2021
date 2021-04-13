import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../model/appointment";
import {AppointmentService} from "../service/appointment.service";
import {CalendarPersonalService} from "../service/calendar-personal.service";
import {map} from "rxjs/operators";
import {CalendarPersonal} from "../model/calendarPersonal";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  isLinear = false;
  is_loading = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  calendarPersonals:CalendarPersonal[];
  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>,private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {appointment:Appointment},private appointmentService:AppointmentService,private calendarPersonalService:CalendarPersonalService) {
  }

  ngOnInit() {
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
    this.appointmentService.createAppointment(f.value.id,this.data.appointment).subscribe(data=>{
      this.appointmentService.AppointmentEmitter.next('created')
    this.dialogRef.close();
  })
  }

}
