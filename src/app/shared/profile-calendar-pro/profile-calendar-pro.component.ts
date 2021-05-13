import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalendarProService} from "../service/calendarPro.service";
import {CalendarProEs} from "../model/CalendarProEs";
import {map, mergeMap} from "rxjs/operators";
import {CalendarGroupService} from "../service/calendar-group.service";
import {CalendarGroup} from "../model/calendarGroup";
declare interface marker {
  position:{
    lat:number,
    lng:number
  },
  label:{
    color:string,
    text:string
  }
  title:string,
  options:{
    animation:google.maps.Animation
  }
}
@Component({
  selector: 'app-profile-calendar-pro',
  templateUrl: './profile-calendar-pro.component.html',
  styleUrls: ['./profile-calendar-pro.component.css']
})
export class ProfileCalendarProComponent implements OnInit {
  id:string;
  calendarsProEs:CalendarProEs[];
  markers:marker[];
  Filter_index:number=-1;
  public loading: boolean=true;
  private calendarsGroup: CalendarGroup;
  constructor(private activatedRoute: ActivatedRoute,private calendarProService:CalendarProService,private calendarGroupService:CalendarGroupService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCalendars();
  }
  private getCalendars() {
    this.calendarProService.getCalendarGroupCalendarsProEs(this.id).pipe(mergeMap(data => {
      this.calendarsProEs = data;
      return this.calendarGroupService.get_calendar(this.id)
    }),map(data=>{
      this.calendarsGroup =data;
      this.addMarker();
    })).subscribe(data=>this.loading = false)

  }
  addMarker() {
    this.markers =[];

      this.markers.push({
        position: {
          lat: this.calendarsGroup.lat ,
          lng: this.calendarsGroup.lon ,
        },
        label: {
          color: 'red',
          text: this.calendarsGroup.name,
        },
        title: 'Marker title ' + (this.markers.length + 1),
        options: { animation:  null},
      })

    this.loading = false;
  }
  changeAnimation(index: number) {
    this.Filter_index = index;
    this.addMarker();
  }

  stopAnimation() {
    this.Filter_index = -1;
    this.addMarker()
  }

}
