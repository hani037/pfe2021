import {Component, Inject, OnInit} from '@angular/core';
import {CalendarPersonalService} from "../service/calendar-personal.service";
import {CalendarPersonal} from "../model/calendarPersonal";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../model/appointment";
import {event} from "../model/event";
import {EventService} from "../service/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  is_loading = true;
  calendarPersonals:CalendarPersonal[];
  constructor(private dialogRef: MatDialogRef<JoinComponent>,private calendarPersonalService:CalendarPersonalService,@Inject(MAT_DIALOG_DATA) public data: {event:event},private eventService:EventService
  ,public router:Router) { }

  ngOnInit(): void {
    this.calendarPersonalService.get_user_calendars().subscribe(data=> {
      this.calendarPersonals = data;
      this.is_loading = false;
    });
  }

  join(f: NgForm) {
    console.log(this.data.event);
    this.eventService.joinEvent(this.data.event,f.value.id).subscribe(data=>{
      if (data){
        this.dialogRef.close()
        this.router.navigateByUrl("home");
      }else {
        this.dialogRef.close("not invited")
      }

    })
  }
}
