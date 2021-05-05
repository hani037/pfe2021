import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalendarProService} from "../service/calendarPro.service";
import {CalendarProEs} from "../model/CalendarProEs";
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
  constructor(private activatedRoute: ActivatedRoute,private calendarProService:CalendarProService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.calendarProService.get_User_calendarProEs(this.id).subscribe(data=>{
      this.calendarsProEs = data;
      console.log(data);
      this.addMarker();
    })
  }
  addMarker() {
    this.markers =[];
    this.calendarsProEs.forEach((calendarPro,index)=>{
      this.markers.push({
        position: {
          lat: calendarPro.location.lat ,
          lng: calendarPro.location.lon ,
        },
        label: {
          color: 'red',
          text: calendarPro.firstName,
        },
        title: 'Marker title ' + (this.markers.length + 1),
        options: { animation: this.Filter_index == index ? google.maps.Animation.BOUNCE: null},
      })
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
