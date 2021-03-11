import {Component, Input, OnInit} from '@angular/core';
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
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {event} from "../model/event";
@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {
  @Input() userName:string;
  @Input() address:string;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  @Input() Events_Client:event[];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {

      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);

      }
    }
  ];
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  events: CalendarEvent[] = [

  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.Events_Client.forEach(event=>{
      this.events.push(
        {
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.start.split(' ')[4],
          color: this.colors.red,
          actions: this.actions
        }
      )
    })
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.dialog.open(ConfirmationComponent, {
      height: '600px',
      width: '600px',
      backdropClass: 'backdropBackground'
    })
  }
}
