import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {Client} from "../model/client";
import {section} from "../model/client";
import {MatDialog} from "@angular/material/dialog";
import {AddEventComponent} from '../add-event/add-event.component';
import {Subject} from 'rxjs';
import {event} from "../model/event";
import {EventService} from "../service/event.service";
import {UserService} from "../service/user.service";
import {CalendarProfileComponent} from "../calendar-profile/calendar-profile.component";
import {EventComponent} from "../event/event.component";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  loading:boolean=true;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  events_user:event[];
  nb:number=0;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen: boolean = true;
  CalendarView = CalendarView;
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="ni ni-calendar-grid-58"></i>',
      a11yLabel: 'prendre un rendez-vous',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      }
    },
  ];

  colors: any = {
    red: {
      primary: 'rgba(244,0,5,0.6)',
      secondary: 'rgba(244,0,5,0.6)'
    },
    blue: {
      primary: 'rgba(33,211,200,0.53)',
      secondary: 'rgba(33,211,200,0.56)'
    },
    yellow: {
      primary: 'rgba(244,232,0,0.67)',
      secondary: 'rgba(244,232,0,0.53)'
    },
    pink: {
      primary: 'rgba(244,13,137,0.56)',
      secondary: 'rgba(255,0,188,0.54)'
    },
    green: {
      primary: 'rgba(0,244,22,0.56)',
      secondary: 'rgba(45,255,22,0.55)'
    }
  };
  events: CalendarEvent[]=[];
  constructor(private dialog: MatDialog,private eventService:EventService,private userService:UserService) { }

  ngOnInit(): void {
    this.get_evnets();
  }
  get_evnets(){
    this.eventService.get_user_events().subscribe(data=>{
      this.events=[];
      this.events_user = data;
      this.events_user.forEach(event=>{
        console.log(event);
        this.events.push( {
          start: new Date(event.start),
          end:new Date(event.end),
          title: event.description,
          id:event.id,
          color:this.colors[event.color],
          actions:this.actions
        },)
      });
      this.loading= false;
    });
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  handleEvent(action: string, event: CalendarEvent): void {
    let CssClass:string;
    switch (event.color.primary) {
      case 'rgba(244,0,5,0.6)': {
        CssClass='backdropBackgroundRed';
        break;
      }
      case 'rgba(33,211,200,0.53)': {
        CssClass='backdropBackgroundBlue';
        break;
      }
      case 'rgba(244,232,0,0.67)': {
        CssClass='backdropBackgroundYellow';
        break;
      }
      case 'rgba(0,244,22,0.56)': {
        CssClass='backdropBackgroundGreen';
        break;
      }
      default: {
        CssClass='backdropBackgroundPink';
        break;
      }
    }
    this.dialog.open(EventComponent, {
      height: '400px',
      width: '350px',
      backdropClass: CssClass,
      data:{id: event.id}
    }).afterClosed().subscribe(data=>{
      this.get_evnets();
      this.refresh.next();
    })
  }
  dayClicked(day): void {
    console.log(day);
  this.view = CalendarView.Day;
  this.viewDate = day.date;
  }
  add_event() {
    this.dialog.open(AddEventComponent, {
      height: '600px',
      width: '500px',
      backdropClass: 'backdropBackground'
    }).afterClosed()
      .subscribe(response => {
        this.get_evnets();
        this.refresh.next();
      });
  }

}
