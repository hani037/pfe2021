import {Component, Input, OnInit} from '@angular/core';
import {CalendarPro} from "../model/CalendarPro";
import {CalendarProEs} from "../model/CalendarProEs";
import {SeanceEs} from "../model/SeanceEs";
import {Appointment} from "../model/appointment";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../service/user.service";
import {DisplayCommentsComponent} from "../display-comments/display-comments.component";

@Component({
  selector: 'app-card-seance',
  templateUrl: './card-seance.component.html',
  styleUrls: ['./card-seance.component.css']
})
export class CardSeanceComponent implements OnInit {
  @Input()calendarPro:CalendarProEs;
  seance:SeanceEs;
  nb=0;
  constructor(private dialog: MatDialog,private userService:UserService) {

  }

  ngOnInit(): void {
    this.seance = this.calendarPro.seanceEsList[0];
  }
  next(){
    this.nb++;
    if (this.nb==this.seance.images.length){
      this.nb =0;
    }
  }
  prev(){
    this.nb--;
    if(this.nb<0){
      this.nb =this.seance.images.length-1;
    }
  }

  appointment() {
    const appointment = new Appointment();
    appointment.date = this.seance.date;
    appointment.calendarProId = this.calendarPro.id ;
    appointment.userId = this.userService.userConnected.id ;
    appointment.start =   this.seance.start ;
    appointment.end =  this.seance.end ;
    this.dialog.open(ConfirmationComponent, {
      backdropClass: 'backdropBackground',
      data :{appointment:appointment ,seance:this.seance}
    })

  }

  openComments() {
    this.dialog.open(DisplayCommentsComponent, {
      backdropClass: 'backdropBackground',
      data :{seance:this.seance}
    })
  }
}
