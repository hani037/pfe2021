import {Component, Inject, OnInit} from '@angular/core';
import {AddEventComponent} from "../add-event/add-event.component";
import {event} from "../model/event";
import {MatDialog} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EventService} from "../service/event.service";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  is_loading:boolean=false;
  event:event;
  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: {id:string},private eventService:EventService) { }

  ngOnInit(): void {
 this.getEvent()
  }
  update(){
    this.dialog.open(AddEventComponent, {
      height: '600px',
      width: '500px',
      backdropClass: 'backdropBackground',
      data:{id:this.event.id}
    }).afterClosed().subscribe(data=>{
      this.getEvent()
    })
  }
  getEvent(){
    this.eventService.get_event_by_id(this.data.id).subscribe(data=>{
      this.event=data;
      this.is_loading = true;
    })
  }

  public delete() {
    this.eventService.delete_event(this.event.id).subscribe()
  }
}
