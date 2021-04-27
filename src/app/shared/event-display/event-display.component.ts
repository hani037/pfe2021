import { Component, OnInit } from '@angular/core';
import {EventService} from "../service/event.service";
import {event} from "../model/event";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {EventComponent} from "../event/event.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../login/login.component";
import {AddEventComponent} from "../add-event/add-event.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {JoinComponent} from "../join/join.component";
@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit {
  event:event;
  user:User;
  is_loading:boolean=false;
  not_invited=false;
  constructor(private dialog: MatDialog,private eventService:EventService,private activatedRoute: ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {

    this.getEvent();
  }

  getEvent(){

      if (this.activatedRoute.snapshot.params['id']){

        this.eventService.get_event_by_id(this.activatedRoute.snapshot.params['id']).subscribe(data=>{
          this.event=data;
          this.is_loading = true;
        })
      }
  }

  join() {
    if(this.userService.userConnected.id){
      this.dialog.open(JoinComponent, {
        backdropClass: 'backdropBackground',
        data :{event:this.event}
      }).afterClosed().subscribe(data=>{
        if (data){
          this.not_invited = true;
        }
      })
    }else {
      this.dialog.open(LoginDialogComponent, {

        backdropClass: 'backdropBackground',
      })
    }
  }
}
