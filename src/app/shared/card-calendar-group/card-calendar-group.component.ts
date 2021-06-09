import {Component, Input, OnInit} from '@angular/core';
import {CalendarPro} from "../model/CalendarPro";
import {CalendarGroup} from "../model/calendarGroup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-calendar-group',
  templateUrl: './card-calendar-group.component.html',
  styleUrls: ['./card-calendar-group.component.css']
})
export class CardCalendarGroupComponent implements OnInit {
  @Input() calendarGroup:CalendarGroup;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  open() {
    this.router.navigateByUrl('home/calendarGroup/'+this.calendarGroup.id)
  }

  edit() {
    this.router.navigateByUrl('config/CreateCalendarGroup/edit/'+this.calendarGroup.id)

  }
}
