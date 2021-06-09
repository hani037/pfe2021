import { Component, OnInit } from '@angular/core';
import {Calendar} from "../model/calendar";
import {UserService} from "../service/user.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-selected-calendar',
  templateUrl: './selected-calendar.component.html',
  styleUrls: ['./selected-calendar.component.css']
})
export class SelectedCalendarComponent implements OnInit {
  is_Loading=true;
  calendarList:Calendar[];
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<SelectedCalendarComponent>,public userService:UserService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      calendar: new FormControl(null, Validators.required),
    });
    this.userService.getUserCalendars().subscribe(data=>{
      this.calendarList = data;
      this.is_Loading=true;
    })
  }

  select() {
    let selectedCalendar = this.userService.userConnected.selectedCalendar;
    selectedCalendar.calendarType = this.calendarList[this.form.value.calendar].calendarType;
    selectedCalendar.calendarId = this.calendarList[this.form.value.calendar].calendarId;
    selectedCalendar.name = this.calendarList[this.form.value.calendar].name;
    this.userService.selectedCalendar(selectedCalendar).subscribe(data=>{
      this.dialogRef.close('updated');
    })
  }
}
