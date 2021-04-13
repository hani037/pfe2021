import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {event} from "../model/event";
import {EventService} from "../service/event.service";
import {Time} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {CalendarPersonalService} from "../service/calendar-personal.service";



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild("fileUpload1", {static: false}) fileUpload_edit: ElementRef;
  file;
  selectable = true;
  removable = true;
  addOnBlur = true;
  is_loading:boolean=true;
  event:event;
  is_edit:boolean=false;
  is_add:boolean=false;
  date1:FormControl;
  start1:string;
  end1:string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [ 'Sport','Education'];

  friends: string[] = [];
  contacts: string[] = [];
  constructor(private dialogRef: MatDialogRef<AddEventComponent>,private eventService:EventService,
              @Inject(MAT_DIALOG_DATA) public data: {id:string,start:Date,end:Date,calendarId:string},private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      if (this.data.id) {
        this.eventService.get_event_by_id(this.data.id).subscribe(data => {
          this.event = data;
          this.date1 = new FormControl(new Date(this.event.start))
          this.start1 = this.event.start.split(' ')[1].replace(":00", "");
          this.end1 = this.event.end.split(' ')[1].replace(":00", "");
          this.tags = data.tags;
          this.contacts = data.contacts;
          this.is_edit = true;
          this.is_loading = false;
        })
      } else if (this.data.start) {
        this.date1 = new FormControl(new Date(this.data.start));
        this.start1 = ("0"+this.data.start.getHours()).slice(-2)+':'+ ("0"+this.data.start.getMinutes()).slice(-2);
        this.end1 = ("0"+this.data.end.getHours()).slice(-2) +':'+ ("0"+this.data.end.getMinutes()).slice(-2);
        this.is_add = true;
        this.is_loading = false;
      }else {
        this.is_loading = false;
      }
    }
    else {
      this.is_loading = false;
    }

  }

  add(f:NgForm) {
    this.is_loading = true;
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
    event1.image = '';
    event1.contacts = this.friends;
    event1.tags = this.tags;
    this.eventService.addEvent(event1,this.data.calendarId).subscribe(data=>{
      this.eventService.eventEmitter.next(true);
      if(this.file){
        this.uploadFile(this.file,data.id);
      }else{
        this.dialogRef.close()
      }
    });

  }
  add_tag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove_tag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  add_friend(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.friends.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove_friend(friend: string): void {
    const index = this.friends.indexOf(friend);

    if (index >= 0) {
      this.friends.splice(index, 1);
    }
  }

  update(f: NgForm) {
    this.is_loading = true;
    this.contacts.push(...this.friends);
    let date = ("0" + this.date1.value.getDate()).slice(-2);
    let month = ("0" + (this.date1.value.getMonth()+1 )).slice(-2);
    let year = this.date1.value.getYear()+1900;
    const start=year + "-" + month + "-" + date + " " + f.value.start + ":00" ;
    const end=year + "-" + month + "-" + date + " " + f.value.end + ":00" ;
    const event1 = new event();
    event1.id =this.event.id;
    event1.start  = start;
    event1.end  = end;
    event1.description  = f.value.description;
    event1.color  = f.value.color;
    event1.contacts = this.contacts;
    event1.tags = this.tags;
    this.eventService.updateEvent(event1,   this.friends).subscribe(data=>{
      this.eventService.eventEmitter.next(true);
      if(!this.file){
        this.dialogRef.close();
        this.openSnackBar('Event updated','Exit');
      }else{
        this.is_loading = true;
        this.uploadFile(this.file,data.id);
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
        const file = fileUpload.files[0];
        this.file = { data: file, inProgress: false, progress: 0};
        console.log(this.file)
    };
    fileUpload.click();

  }

  uploadFile(file,id:string) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.eventService.uploadImage(formData,id).subscribe(data=>{
      console.log(data)
      this.dialogRef.close();
      this.openSnackBar('Event created ','Exit');
    })
  }
  addFromCalendar(f:NgForm) {
    this.is_loading = true;
    let contacts:string[] = this.friends;
    let date = ("0" + this.date1.value.getDate()).slice(-2);
    let month = ("0" + (this.date1.value.getMonth()+1 )).slice(-2);
    let year = this.date1.value.getYear()+1900;
    let start_hour = f.value.start;
    let end_hour =f.value.end;
    const start=year + "-" + month + "-" + date + " " + start_hour + ":00" ;
    const end=year + "-" + month + "-" + date + " " + end_hour+ ":00" ;
    const event1 = new event();
    event1.start  = start;
    event1.end  = end;
    event1.description  = f.value.description;
    event1.color  = f.value.color;
    event1.image = '';
    event1.contacts = this.friends;
    event1.tags = this.tags;
    this.eventService.addEvent(event1,this.data.calendarId).subscribe(data=>{
      this.eventService.eventEmitter.next(true);
      if(this.file){
        this.uploadFile(this.file,data.id);
      }else{
        this.dialogRef.close()
      }

    });

  }
}

