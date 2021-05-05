import { Component, OnInit } from '@angular/core';
import {CalendarGroupService} from "../service/calendar-group.service";
import {ActivatedRoute} from "@angular/router";
import {CalendarGroup} from "../model/calendarGroup";

@Component({
  selector: 'app-calendar-group',
  templateUrl: './calendar-group.component.html',
  styleUrls: ['./calendar-group.component.css']
})
export class CalendarGroupComponent implements OnInit {
  id:string;
  calendarGroup:CalendarGroup;
  loading:Boolean=true;

  constructor(private activatedRoute: ActivatedRoute,private calendarGroupService:CalendarGroupService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.calendarGroupService.get_calendar(this.id).subscribe(data=>{
      this.calendarGroup = data;
      this.loading = false;
    })
  }

}
