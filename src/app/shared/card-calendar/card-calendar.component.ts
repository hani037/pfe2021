import {Component, Input, OnInit} from '@angular/core';
import {CalendarPersonal} from "../model/calendarPersonal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-calendar',
  templateUrl: './card-calendar.component.html',
  styleUrls: ['./card-calendar.component.css']
})
export class CardCalendarComponent implements OnInit {
  @Input() calendarPersonal:CalendarPersonal;
  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  open() {
  this.router.navigateByUrl('home/calendarPersonal/'+this.calendarPersonal.id)
  }
}
