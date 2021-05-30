import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {CalendarProService} from "../service/calendarPro.service";
import {CalendarPro} from "../model/CalendarPro";
import {CalendarProEs} from "../model/CalendarProEs";

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
  listener;
  constructor(private calendarProService:CalendarProService,private renderer2: Renderer2) {
    this.listener = this.renderer2.listen('window', 'scroll', (e) => {
      console.log("this.getYPosition(e)");
    });
    }
    @HostListener('window:scroll', ['$event']) onWindowScroll(e) {
      console.log(e.target['scrollingElement'].scrollTop)


      // Your Code Here

  }
  ngOnInit(): void {
    this.calendarProService.userFeed(this.pageNb,this.pageSize).subscribe(data=>{
      console.log(data);
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

}
