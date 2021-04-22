import {Component, Input, OnInit} from '@angular/core';
import {CalendarPersonal} from "../model/calendarPersonal";
import {CalendarPro} from "../model/CalendarPro";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-calendar-pro',
  templateUrl: './card-calendar-pro.component.html',
  styleUrls: ['./card-calendar-pro.component.css']
})
export class CardCalendarProComponent implements OnInit {
  @Input() calendarPro:CalendarPro;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  open() {
    this.router.navigateByUrl('home/calendarPro/'+this.calendarPro.id)
  }
}
