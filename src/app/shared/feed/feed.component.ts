import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {CalendarProService} from "../service/calendarPro.service";
import {CalendarPro} from "../model/CalendarPro";
import {CalendarProEs} from "../model/CalendarProEs";
import {SelectedCalendarComponent} from "../selected-calendar/selected-calendar.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  calendarProList:CalendarProEs[];
  pageSize = 40;
  pageNb=0;
  stopLoad=false;
  is_loading=true;
  listener;
  constructor(private calendarProService:CalendarProService,private dialog: MatDialog,public userService:UserService) {

  }
  ngOnInit(): void {
    this.calendarProService.userFeed(this.pageNb,this.pageSize).subscribe(data=>{
      this.is_loading = false;
      this.calendarProList = data.content;
    })
  }
  @HostListener("window:scroll", ['$event'])
  onWindowScrolla(){
    console.log('aa')
    if(!this.stopLoad){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadData();
      }
    }
  }
  loadData(){
    this.pageNb++;
    this.calendarProService.userFeed(this.pageNb,this.pageSize).subscribe(data=>{
      console.log(data);
      this.calendarProList.push(...data.content);
      if(this.pageNb==data.totalPages-1){
        this.stopLoad = true;
      }
    })
  }

  change_calendar() {
    this.dialog.open(SelectedCalendarComponent, {
      backdropClass: 'backdropBackground',
    }).afterClosed().subscribe(data=>{
      if(data){
        this.userService.me().subscribe(data=>this.ngOnInit());
      }
    })
  }
}
