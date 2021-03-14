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
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild("fileUpload1", {static: false}) fileUpload_edit: ElementRef;
  file;
  selectable = true;
  removable = true;
  addOnBlur = true;
  is_loading:boolean=true;
  event:event;
  is_edit:boolean=false;
  date1:FormControl;
  start1:string;
  end1:string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
    {name: 'Sport'},
    {name: 'Education'},
  ];
  friends: Friend[] = [
  ];
  constructor(private dialogRef: MatDialogRef<AddEventComponent>,private eventService:EventService,
              @Inject(MAT_DIALOG_DATA) public data: {id:string},private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data){
      this.eventService.get_event_by_id(this.data.id).subscribe(data=>{
        this.event=data;
        this.date1 = new FormControl(new Date(this.event.start))
        this.start1 = this.event.start.split(' ')[1].replace(":00","");
        this.end1 = this.event.end.split(' ')[1].replace(":00","");
        this.is_edit = true;
        this.is_loading = false;
      })
    }else {
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
    this.eventService.create_user_events(event1).subscribe(data=>{
      this.uploadFile(this.file,data.id);

    });

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
    console.log(f);
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
    this.eventService.updateEvent(event1).subscribe(data=>{
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
}

