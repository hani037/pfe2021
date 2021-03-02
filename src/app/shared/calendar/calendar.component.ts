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
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  loading:boolean=true;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  /*client:Client ={id:1,userName:'Terrains El Menzah 5 ',lat:36.8484,lng:10.1745,
    sections:[{description:'terrain annexe1',img:'../../../assets/img/terrain1.jpg',
      rdv:[{start:'2021-02-20T08:00:00.000Z',end:'2021-02-20T14:00:00.000Z'}]},
      {description:'terrain annexe2',img:'../../../assets/img/terrain1.jpg',
        rdv:[{start:'2021-02-20T09:00:00.000Z',end:'2021-02-20T11:00:00.000Z'}]}]};
  section:section;
   */
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
     this.eventService.get_user_events().subscribe(data=>{
       console.log(data)
       this.events_user = data;
       this.events_user.forEach(event=>{
         this.events.push( {
           start: new Date(event.start),
           end:new Date(event.end),
           title: event.description,
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
        const event1 = new event();
        event1.start  = response.data.start;
        event1.end  = response.data.end;
        event1.description  = response.data.description;
        event1.color  = response.data.color;

        this.events.push( {
          start: new Date(response.data.start),
          end:new Date(response.data.end),
          title:response.data.description,
          color:this.colors[response.data.color],
          actions:this.actions
        },)
        this.eventService.create_user_events(event1).subscribe(data=>console.log(data));
        this.refresh.next();
      });
  }

}
