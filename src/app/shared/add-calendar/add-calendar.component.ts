import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {EventService} from "../service/event.service";
import {CalendarPersonalService} from "../service/calendar-personal.service";
import {CalendarPersonal} from "../model/calendarPersonal";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {
  is_loading=false;
  constructor(private dialogRef: MatDialogRef<AddCalendarComponent>,private calendarPersonalService:CalendarPersonalService) { }

  ngOnInit(): void {
  }

  add(f: NgForm) {
    this.is_loading = true;
  this.calendarPersonalService.add_calendar(f.value.name).subscribe(data=>{
    this.calendarPersonalService.CalendarEmitter.next(true)
    this.dialogRef.close();
  })
  }
}
