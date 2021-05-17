import {Component, Directive, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
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
import {DateService} from "../service/date.service";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";



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
  is_loading: boolean = true;
  event: event;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = ['Sport', 'Education'];
  FormGroup: FormGroup;
  friends: string[] = [];
  contacts: string[] = [];
  list: string[] = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];
  days: string[] = ['SUNDAY','MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  constructor(private dialogRef: MatDialogRef<AddEventComponent>, private eventService: EventService,
              @Inject(MAT_DIALOG_DATA) public data: { id: string, start: Date, end: Date, calendarId: string }, private _snackBar: MatSnackBar,
              private dateService: DateService, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {


    if (this.data.id) {
      this.eventService.get_event_by_id(this.data.id).subscribe(data => {
        this.event = data;
        console.log(this.event)
        this.InitFormsFromEvent(this.event);
        this.tags = this.event.tags;
        this.contacts = this.event.contacts;
        this.is_loading = false;
      })
    } else if (this.data.start) {
      this.InitForms();
      this.FormGroup.value.date = new FormControl(new Date(this.data.start));
      this.FormGroup.value.date = this.dateService.getHours(this.data.start);
      this.FormGroup.value.date = this.dateService.getHours(this.data.end);
      this.is_loading = false;
    } else {
      this.InitForms();
      this.is_loading = false;
    }
  }


  InitForms() {

    this.FormGroup = this._formBuilder.group({
      date: [''],
      start: ['', Validators.required],
      end: ['', Validators.required],
      recurrence: [false, Validators.required],
      recurrenceType: [''],
      description: ['', Validators.required],
      color: ['red', Validators.required],
    });
  }

  InitFormsFromEvent(event) {
    let date;
    if(!event.recurrence){
      date = new FormControl(new Date(event.date));
    }else {
      if(event.recurrenceType =="MONTHLY"||event.recurrenceType =="YEARLY"){
        date = moment(new Date(event.date));
      }else if(event.recurrenceType=='WEEKLY'){
        date = Number(event.date);
      }

    }
    this.FormGroup = this._formBuilder.group({
      date: date,
      start: [event.start, Validators.required],
      end: [event.end, Validators.required],
      recurrence: [event.recurrence],
      recurrenceType: [event.recurrenceType],
      description: [event.description],
      color: [event.color],
      image: [event.image],
    });


  }

  add() {

    this.is_loading = true;
    const event1 = new event();
    event1.start = this.FormGroup.value.start;
    event1.end = this.FormGroup.value.end;
    event1.recurrence = this.FormGroup.value.recurrence == true;
    if (event1.recurrence) {
      event1.recurrenceType = this.FormGroup.value.recurrenceType;
      if (event1.recurrenceType == "MONTHLY" || event1.recurrenceType == "YEARLY") {
        event1.date = this.dateService.getDate(this.FormGroup.value.date._d);
      } else  {
        event1.date = this.FormGroup.value.date;
      }
    } else {
      event1.recurrenceType = '';
      event1.date = this.dateService.getDate(this.FormGroup.value.date);
    }
    event1.description = this.FormGroup.value.description;
    event1.color = this.FormGroup.value.color;
    event1.image = '';
    event1.contacts = this.friends;
    event1.tags = this.tags;
    event1.calendarsId = [];
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

  update() {
    this.is_loading = true;
    this.contacts.push(...this.friends);
    let event1 = new event();
    event1.id = this.event.id;
    event1.start = this.FormGroup.value.start;
    event1.end = this.FormGroup.value.end;
    event1.recurrence = this.FormGroup.value.recurrence == true;
    if (event1.recurrence) {
      event1.recurrenceType = this.FormGroup.value.recurrenceType;
      if (event1.recurrenceType == "MONTHLY" || event1.recurrenceType == "YEARLY") {
        event1.date = this.dateService.getDate(this.FormGroup.value.date._d);
      } else  {
        event1.date = this.FormGroup.value.date;
      }
    } else {
      event1.recurrenceType = '';
      event1.date = this.dateService.getDate(this.FormGroup.value.date);
    }
    event1.description = this.FormGroup.value.description;
    event1.color = this.FormGroup.value.color;
    event1.contacts = this.contacts;
    event1.tags = this.tags;
    this.eventService.updateEvent(event1, this.friends).subscribe(data => {
      this.eventService.eventEmitter.next(true);
      if (!this.file) {
        this.dialogRef.close();
        this.openSnackBar('Event updated', 'Exit');
      } else {
        this.is_loading = true;
        this.uploadFile(this.file, data.id);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      this.file = {data: file, inProgress: false, progress: 0};
      console.log(this.file)
    };
    fileUpload.click();

  }

  uploadFile(file, id: string) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.eventService.uploadImage(formData, id).subscribe(data => {
      this.dialogRef.close();
      this.openSnackBar('Event created ', 'Exit');
    })
  }
}


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM',
  },
  display: {
    dateInput: 'DD/MM',
    monthYearLabel: 'DD MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DDDD MMMM',
  },
};
export const MY_FORMATS2 = {
  parse: {
    dateInput: 'DD',
  },
  display: {
    dateInput: 'DD',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DDDD',
  },
};


@Directive({
  selector: '[dateFormat1]',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CustomDateFormat1 {
}
@Directive({
  selector: '[dateFormat2]',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2},
  ],
})
export class CustomDateFormat2 {
}
