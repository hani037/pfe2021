import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CalendarPersonalService} from "../shared/service/calendar-personal.service";
import {CalendarPersonal} from "../shared/model/calendarPersonal";
import {EventService} from "../shared/service/event.service";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {AddCalendarComponent} from "../shared/add-calendar/add-calendar.component";
import {MatDialog} from "@angular/material/dialog";
import {CalendarPro} from "../shared/model/CalendarPro";
import {map, mergeMap} from "rxjs/operators";
import {CalendarProService} from "../shared/service/calendarPro.service";
import {CalendarGroupService} from "../shared/service/calendar-group.service";
import {CalendarGroup} from "../shared/model/calendarGroup";
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'calendar_today'
    },
    {
      id: 2,
      icon: 'groups'
    },
    {
      id: 3,
      icon: 'work'
    }
  ];
  calendarsPersonal:CalendarPersonal[];
  calendarsPro:CalendarPro[];
  calendarsGroup:CalendarGroup[];

  loading:boolean=true;

  constructor(private toastrService: ToastService,private eventService:EventService,private calendarPersonalService:CalendarPersonalService,private dialog: MatDialog
              ,private calendarProService:CalendarProService,private router:Router,private calendarGroupService:CalendarGroupService) { }

  ngOnInit(): void {
    this.getCalendars();
    this.calendarPersonalService.CalendarEmitter.subscribe(data=> {
      if(data){
        this.getCalendar();
        this.showSuccess();
      }
    });

  }
  getCalendar(){
    this.calendarPersonalService.get_user_calendars().subscribe(data => {
      this.calendarsPersonal = data;
      this.loading = false;
      this.showSuccess();
    })
  }

  showSuccess() {

    this.toastrService.success('felicitations votre calendrier Personel a ete bien cree',  {
      duration: 1000,
    });
  }
  add(event) {
    if(event ==1){
      this.dialog.open(AddCalendarComponent, {
        height: '200px',
        width: '300px',
        backdropClass: 'backdropBackground',
      })



    }if(event == 2){
      this.router.navigateByUrl('home/CreateCalendarGroup')
    }if(event == 3){
      this.router.navigateByUrl('sign-uppro')

    }

  }

  private getCalendars() {
    this.calendarPersonalService.get_user_calendars().pipe(mergeMap(data => {
      this.calendarsPersonal = data;
      return this.calendarProService.get_user_calendarsPro()
    }),mergeMap(data=>{
      this.calendarsPro =data;
      return this.calendarGroupService.get_user_calendarsGroup()
    }),map(data=>{
      this.calendarsGroup =data;
    })).subscribe(data=>this.loading = false)

  }
}
