import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/service/user.service";
import {Router} from "@angular/router";
import {SelectedCalendarComponent} from "../shared/selected-calendar/selected-calendar.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router:Router,public userService:UserService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.navigateByUrl('home/'+this.userService.userConnected.selectedCalendar.calendarType+"/"+this.userService.userConnected.selectedCalendar.calendarId);
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
