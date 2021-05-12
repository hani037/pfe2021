import {Component, Input, OnInit} from '@angular/core';
import {CalendarPersonal} from "../model/calendarPersonal";
import {CalendarPro} from "../model/CalendarPro";
import {Router} from "@angular/router";
import {CalendarProService} from "../service/calendarPro.service";

@Component({
  selector: 'app-card-calendar-pro',
  templateUrl: './card-calendar-pro.component.html',
  styleUrls: ['./card-calendar-pro.component.css']
})
export class CardCalendarProComponent implements OnInit {
  @Input() calendarPro:CalendarPro;
  constructor(private router:Router,private calendarProService:CalendarProService) { }

  ngOnInit(): void {
  }
  open() {
    this.router.navigateByUrl('home/calendarPro/'+this.calendarPro.id)
  }
  edit() {
    this.router.navigateByUrl('sign-uppro/edit/'+this.calendarPro.id)
  }
  change(event) {
    this.calendarProService.updateEnabled(this.calendarPro.id).subscribe()

  }
}
