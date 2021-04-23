import {Component, HostListener, OnInit} from '@angular/core';
import {$e} from "codelyzer/angular/styles/chars";
import {event} from "../model/event";
import {CalendarProService} from "../service/calendarPro.service";
import {CalendarProEs} from "../model/CalendarProEs";
import {AppointmentService} from "../service/appointment.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";
import {SearchByDateComponent} from "../search-by-date/search-by-date.component";
import {PageEvent} from "@angular/material/paginator";
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
declare interface Client {

    userName: string,
    events:event[],
    Address: string,
    lat:number,
    lng:number

}
declare interface Filter {
  name: string;
}
declare interface Trier {
  name: string;
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  date;
  length;
  pageSize = 1;
  pageNb=0;
  isMobileResolution =false;
  Filter_index:number=-1;
  Trier_index:number=-1;
  markers:marker[];
  calendarPro:CalendarProEs[]=[];
  filters: Filter[] = [
  ];
  trier: Trier[] = [{name:'le plus proche'},{name:'le plus cher'},{name:'le moins cher'}];
  selectable = true;
  removable = true;
  loading: boolean = true;
  constructor(private dialog: MatDialog,private calendarProService:CalendarProService,private appointmentService:AppointmentService) {
    this.isMobileResolution = window.innerWidth < 900;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobileResolution = window.innerWidth < 900;
  }
  ngOnInit(): void {
    this.appointmentService.AppointmentEmitter.subscribe(data=>{
      if(data){
        this.loading = true;
        this.Search();
      }
    });
    this.Search();

  }
  Search(){
  this.calendarProService.search(this.pageNb,this.pageSize).subscribe(calendarProEs=>{
    if (calendarProEs.totalPages !=0){
      this.length = calendarProEs.content.length * calendarProEs.totalPages;
    }else {
      this.length =0;
    }
    this.calendarPro=calendarProEs.content;
    this.addMarker();
   });
  }
  SearchByDate(){
    this.calendarProService.searchByAvailabilityDate(this.pageNb,this.pageSize,this.date).subscribe(calendarProEs=>{
      if (calendarProEs.totalPages !=0){
        this.length = calendarProEs.content.length * calendarProEs.totalPages;
      }else {
        this.length =0;
      }
      this.calendarPro=calendarProEs.content;
      this.addMarker();
    });
  }
  SearchToday(){
    this.calendarProService.searchByAvailabilityToday(this.pageNb,this.pageSize).subscribe(calendarProEs=>{
      if (calendarProEs.totalPages !=0){
        this.length = calendarProEs.content.length * calendarProEs.totalPages;
      }else {
        this.length =0;
      }
      this.calendarPro=calendarProEs.content;
      this.addMarker();
    });
  }
  addMarker() {
    this.markers =[];
    this.calendarPro.forEach((calendarPro,index)=>{
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
  remove(filter: Filter): void {
    const index = this.filters.indexOf(filter);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
    if (filter.name){
      this.pageNb =0;
      this.loading = true;
      this.ngOnInit();
    }
  }

  filterClicked(filter: string) {

    if (filter == "Available Today"){
      let filter_exist=false;
      this.filters.forEach(fil=>{
        if (fil.name=="Available Today"){
          filter_exist = true;
        }
      });
      if(!filter_exist){
        this.pageNb =0;
        this.filters = [];
        this.filters.push({name:filter});
        this.loading = true;
      this.SearchToday();
      }
    }else if(filter == "Available By Date"){
      this.pageNb =0;
      this.dialog.open(SearchByDateComponent, {
        height: '250px',
        width: '300px',
        backdropClass: 'backdropBackground',
      }).afterClosed().subscribe(date=>{
        if(date){
          this.date = date;
          this.filters = [];
          this.filters.push({name:filter});
          this.loading = true;
          this.SearchByDate();
        }
      })
    }
  }

  trierPar(i: number) {
    this.Trier_index = i;
  }

  removeTrier() {
    this.Trier_index = -1;
  }

  page($event: PageEvent) {
    this.pageNb = $event.pageIndex;
    if(this.filters.length > 0){
      if(this.filters[0].name == "Available By Date"){
        this.SearchByDate()
      }else if(this.filters[0].name == "Available Today"){
        this.SearchToday();
      }
    }else {
    this.Search();
    }
  }
}
