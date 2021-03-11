import {Component, Inject, OnInit} from '@angular/core';
import {AddEventComponent} from "../add-event/add-event.component";
import {event} from "../model/event";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EventService} from "../service/event.service";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  is_loading:boolean=false;
  event:event;
  constructor(private dialogRef: MatDialogRef<EventComponent>,private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {id:string},private eventService:EventService
              ,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
 this.getEvent()
  }
  update(){
    this.dialog.open(AddEventComponent, {
      height: '600px',
      width: '500px',
      data:{id:this.event.id}
    }).afterClosed().subscribe(data=>{
      this.getEvent();
    })
  }
  getEvent(){
    this.eventService.get_event_by_id(this.data.id).subscribe(data=>{
      this.event=data;
      this.is_loading = true;
    })
  }

  public delete() {
    this.eventService.delete_event(this.event.id).subscribe(data=>{
      this.dialogRef.close();
      this.openSnackBar('Event deleted','Exit');
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
