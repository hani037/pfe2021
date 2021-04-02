import { Component, OnInit } from '@angular/core';
import {EventService} from "../service/event.service";
import {event} from "../model/event";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {EventComponent} from "../event/event.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../login/login.component";
@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit {
  event:event;
  user:User;
  is_loading:boolean=false;
  constructor(private dialog: MatDialog,private eventService:EventService,private activatedRoute: ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id'])
    this.getEvent();
  }

  getEvent(){
    console.log(this.activatedRoute.snapshot.params['id'])
      if (this.activatedRoute.snapshot.params['id']){

        this.eventService.get_event_by_id(this.activatedRoute.snapshot.params['id']).subscribe(data=>{
          this.event=data;
          this.is_loading = true;
        })
      }
  }

  join() {
    if(this.userService.userConnected.id){

    }else {

    }
  }
}
