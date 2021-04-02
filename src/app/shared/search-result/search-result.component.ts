import {Component, HostListener, OnInit} from '@angular/core';
import {$e} from "codelyzer/angular/styles/chars";
import {event} from "../model/event";
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
  isMobileResolution =false;
  Filter_index:number=-1;
  Trier_index:number=-1;
  markers:marker[];
  clients:Client[]=[];
  center:google.maps.LatLngLiteral;
  filters: Filter[] = [
  ];
  trier: Trier[] = [{name:'le plus proche'},{name:'le plus cher'},{name:'le moins cher'}];
  selectable = true;
  removable = true;
  constructor() {
    this.isMobileResolution = window.innerWidth < 900;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobileResolution = window.innerWidth < 900;
  }
  ngOnInit(): void {
    this.clients.push({userName:'useName1' ,events:[
      {start:'Sat Mar 13 2021 09:00:00',end:'Sat Mar 13 2021 10:00:00',color:'',description:'09:00',image:''},
      {start:'Sat Mar 13 2021 11:00:00',end:'Sat Mar 13 2021 12:00:000',color:'',description:'09:00',image:''},
      {start:'Sat Mar 13 2021 12:00:00',end:'Sat Mar 13 2021 13:00:00',color:'',description:'09:00',image:''},
      {start:'Sat Mar 13 2021 14:00:00',end:'Sat Mar 13 2021 15:00:00',color:'',description:'09:00',image:''},
      {start:'Sat Mar 12 2021 09:00:00',end:'Sat Mar 12 2021 10:00:00',color:'',description:'09:00',image:''},

      ], Address:'address1',lat:36.807381,lng:10.181763},
      {userName:'useName2' ,events:[
          {start:'Sat Mar 13 2021 09:00:00',end:'Sat Mar 13 2021 10:00:00',color:'',description:'09:00',image:''},
          {start:'Sat Mar 13 2021 11:00:00',end:'Sat Mar 13 2021 12:00:000',color:'',description:'09:00',image:''},
          {start:'Sat Mar 13 2021 14:00:00',end:'Sat Mar 13 2021 15:00:00',color:'',description:'09:00',image:''},
          {start:'Sat Mar 12 2021 12:00:00',end:'Sat Mar 12 2021 13:00:00',color:'',description:'09:00',image:''},

        ], Address:'address2',lat:36.806389,lng:10.181667},
      {userName:'useName3' ,events:[
          {start:'Sat Mar 13 2021 09:00:00',end:'Sat Mar 13 2021 10:00:00',color:'',description:'09:00',image:''},
          {start:'Sat Mar 13 2021 8:00:00',end:'Sat Mar 13 2021 09:00:00',color:'',description:'09:00',image:''},
          {start:'Sat Mar 13 2021 14:00:00',end:'Sat Mar 13 2021 15:00:00',color:'',description:'09:00',image:''},
          {start:'Sat Mar 12 2021 09:00:00',end:'Sat Mar 12 2021 10:00:00',color:'',description:'09:00',image:''},

        ], Address:'address3',lat:36.805389,lng:10.181667},
      {userName:'useName4' ,events:[
          {start:'Sat Mar 13 2021 9:00:00',end:'Sat Mar 13 2021 10:00:00',color:'',description:'',image:''},
          {start:'Sat Mar 13 2021 14:00:00',end:'Sat Mar 13 2021 15:00:00',color:'',description:'',image:''},
          {start:'Sat Mar 12 2021 9:00:00',end:'Sat Mar 12 2021 10:00:00',color:'',description:'',image:''},

        ], Address:'address4',lat:36.804389,lng:10.181687});
    this.center = {lat:36.806389,lng:10.181667}
    this.addMarker();
  }
  addMarker() {
    this.markers =[]
    this.clients.forEach((client,index)=>{
      this.markers.push({
        position: {
          lat: client.lat ,
          lng: client.lng ,
        },
        label: {
          color: 'red',
          text: client.userName,
        },
        title: 'Marker title ' + (this.markers.length + 1),
        options: { animation: this.Filter_index == index ? google.maps.Animation.BOUNCE: null},
      })
    })

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
  }

  filterClicked(filter: string) {
    let filter_exist=false;
    this.filters.forEach(fil=>{
      if (fil.name==filter){
        filter_exist = true;
      }
    });
    if (!filter_exist){
      this.filters.push({name:filter})
    }
  }

  trierPar(i: number) {
    this.Trier_index = i;
  }

  removeTrier() {
    this.Trier_index = -1;
  }
}
