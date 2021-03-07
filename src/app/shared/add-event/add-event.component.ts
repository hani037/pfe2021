import {Component, Inject, OnInit} from '@angular/core';
import { NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {event} from "../model/event";
import {EventService} from "../service/event.service";

export interface Tag {
  name: string;
}
export interface Friend {
  name: string;
}
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  is_loading:boolean=false;
  event:event;
  is_edit:boolean=false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
    {name: 'Sport'},
    {name: 'Education'},
  ];
  friends: Friend[] = [
  ];
  constructor(private dialogRef: MatDialogRef<AddEventComponent>,private eventService:EventService,@Inject(MAT_DIALOG_DATA) public data: {id:string}) { }

  ngOnInit(): void {
    if (this.data){
      this.eventService.get_event_by_id(this.data.id).subscribe(data=>{
        this.event=data;
        this.is_loading = true;
        this.is_edit = true;
      })
    }

  }



  add(f:NgForm) {


    let date = ("0" + f.value.date.getDate()).slice(-2);

    let month = ("0" + (f.value.date.getMonth()+1 )).slice(-2);
    let year = f.value.date.getYear()+1900;

    const start=year + "-" + month + "-" + date + " " + f.value.start + ":00" ;
    const end=year + "-" + month + "-" + date + " " + f.value.end + ":00" ;
    const event1 = new event();
    event1.start  = start;
    event1.end  = end;
    event1.description  = f.value.description;
    event1.color  = f.value.color;
    this.eventService.create_user_events(event1).subscribe(data=>this.dialogRef.close());

  }
  add_tag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove_tag(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  add_friend(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.friends.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove_friend(friend: Friend): void {
    const index = this.friends.indexOf(friend);

    if (index >= 0) {
      this.friends.splice(index, 1);
    }
  }

  update(f: NgForm) {

    let date = ("0" + f.value.date.getDate()).slice(-2);
    let month = ("0" + (f.value.date.getMonth()+1 )).slice(-2);
    let year = f.value.date.getYear()+1900;

    const start=year + "-" + month + "-" + date + " " + f.value.start + ":00" ;
    const end=year + "-" + month + "-" + date + " " + f.value.end + ":00" ;
    const event1 = new event();
    event1.id =this.event.id;
    event1.start  = start;
    event1.end  = end;
    event1.description  = f.value.description;
    event1.color  = f.value.color;
    this.eventService.updateEvent(event1).subscribe(data=>this.dialogRef.close());
  }
}
