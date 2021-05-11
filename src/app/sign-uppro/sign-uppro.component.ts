import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../shared/model/user';
import { UserService } from '../shared/service/user.service';
import { formatDate } from '@angular/common';
import { CalendarProService } from '../shared/service/calendarPro.service';
import{CalendarPro} from '../shared/model/CalendarPro';
import { ActivatedRoute, Router } from '@angular/router';
import { DaySchedule } from '../shared/model/daySchedule';
import { MatStepper } from '@angular/material/stepper';
import {CalendarGroupService} from "../shared/service/calendar-group.service";
import {CalendarGroup} from "../shared/model/calendarGroup";
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-sign-uppro',
  templateUrl: './sign-uppro.component.html',
  styleUrls: ['./sign-uppro.component.css']
})


export class SignUpproComponent implements OnInit {


  public list:string[]=['médecine','divertissement','sport','maintenance'];
  calendarpro:CalendarPro;
  id:string;
  calendarProform: FormGroup;
  formchng:boolean=false;
  secondformchanged:boolean=false;
  weekformChanged:boolean =false;
  calendarformChanged:boolean=false;
  loading=true;
  private max: Date;
  private min: Date;

constructor(private toastrService: ToastService,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder ,private router:Router,private calendarProService:CalendarProService){}

ngOnInit(): void {

  if(this.activatedRoute.snapshot.params['id']){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCalendarPro();}

  else {

  this.InitForms();
  this.loading = false;

}
}

showSuccess() {

  this.toastrService.info('felicitations votre calendrier a ete cree',  {
    duration: 1000,
  });
}
InitForms(){

  this.min = new Date();
  this.calendarProform = this._formBuilder.group({

    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    job:['',Validators.required],
    startDate:[  '', Validators.required],
    enabled: [true, Validators.required],
    expiryDate:[  '', Validators.required],
    lat:  ['', Validators.required],
    duration:  ['', Validators.required],
    weekSchedule: this.initWeekSchedule()

  });}


initItemRows() {
return this._formBuilder.group({
  start:['08:00', Validators.required],
  end :['10:00', Validators.required],  });
}

initWeekSchedule(){

    return this._formBuilder.array([
      this._formBuilder.array([this.initItemRows()]),
      this._formBuilder.array([this.initItemRows()]),
      this._formBuilder.array([this.initItemRows()]),
      this._formBuilder.array([this.initItemRows()]),
      this._formBuilder.array([this.initItemRows()]),
      this._formBuilder.array([this.initItemRows()]),
      this._formBuilder.array([this.initItemRows()]),

    ]);

  }

addSeance(i:number,j:number) {
  let day =this.calendarProform.get("weekSchedule").get(""+j)as FormArray;
  day.push(this.initItemRows());
}

deleteSeance(i:number,j:number,t:number) {
  let day =this.calendarProform.get("weekSchedule").get(""+j)as FormArray;
  day.removeAt(t);
}

async createCalendarPro(stepper: MatStepper) {

    let calendarPro = new CalendarPro();
      calendarPro.firstName = this.calendarProform.value.firstName;
      calendarPro.lastName = this.calendarProform.value.lastName;
      calendarPro.job = this.calendarProform.value.job;
      calendarPro.startDate = this.calendarProform.value.startDate;
      calendarPro.expiryDate = this.calendarProform.value.expiryDate;
      calendarPro.chrono = this.calendarProform.value.duration;
      calendarPro.address = this.calendarProform.value.address;
      calendarPro.enabled = this.calendarProform.value.enabled;

    calendarPro.weekSchedule = [

      {id: '', name: 'Monday', seances: this.calendarProform.value.weekSchedule[0]},
      {id: '', name: 'Tuesday', seances: this.calendarProform.value.weekSchedule[1]},
      {id: '', name: 'Wednesday', seances: this.calendarProform.value.weekSchedule[2]},
      {id: '', name: 'Thursday', seances: this.calendarProform.value.weekSchedule[3]},
      {id: '', name: 'Friday', seances: this.calendarProform.value.weekSchedule[4]},
      {id: '', name: 'Saturday', seances: this.calendarProform.value.weekSchedule[5]},
      {id: '', name: 'Sunday', seances: this.calendarProform.value.weekSchedule[6]},
    ];
    console.log(calendarPro)
    this.calendarProService.createCalendarPro(calendarPro).subscribe(
      calendarPro=>{
        this.calendarProService.calendarsPro.push(calendarPro);

         console.log(calendarPro)
      });
  }

private  getCalendarPro() {
  this.calendarProService.get_calendarPro(this.id).subscribe(data=>{
    console.log(data);

this.calendarpro=data;
this.initCalendarProFromCalendarPro().then(r =>this.loading = false );

  });

}
private  async initCalendarProFromCalendarPro() {

    this.calendarProform = this._formBuilder.group({
      firstName: [this.calendarpro.firstName, Validators.required],
      lastName: [this.calendarpro.lastName, Validators.required],
      address: [this.calendarpro.address, Validators.required],
      startDate:[ this.calendarpro.startDate , Validators.required],
      expiryDate:  [this.calendarpro.expiryDate, Validators.required],
      duration : [this.calendarpro.chrono, Validators.required],
      job: [this.calendarpro.job, Validators.required],
      enabled: [this.calendarpro.enabled, Validators.required],
      weekSchedule: this.initWeekScheduleFromCalendarPro()

    });

this.calendarpro.weekSchedule.forEach((daySchedule,index2)=>{
      daySchedule.seances.forEach((seance,index3)=>{
        let day =this.calendarProform.get("weekSchedule").get(""+index2)as FormArray;
        day.push(this.initItemRowsFromCalendar(seance.start,seance.end));

      })

    });
      this.FormOnChanges();


    }


initWeekScheduleFromCalendarPro(){

  return this._formBuilder.array([
    this._formBuilder.array([]),
    this._formBuilder.array([]),
    this._formBuilder.array([]),
    this._formBuilder.array([]),
    this._formBuilder.array([]),
    this._formBuilder.array([]),
    this._formBuilder.array([]),
  ]);

}

private initItemRowsFromCalendar(start,end) {
  return this._formBuilder.group({
    start:[start, Validators.required],
    end :[end, Validators.required],
  });
}
startChanged(startDate) {
  this.max = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+60);
}


updateCalendarPro( stepper: MatStepper){

  let calendarPro = new CalendarPro();

       calendarPro.appointment=this.calendarpro.appointment;
      calendarPro.firstName = this.calendarProform.value.firstName;
      calendarPro.lastName = this.calendarProform.value.lastName;
      calendarPro.job = this.calendarProform.value.job;
      calendarPro.startDate = this.calendarProform.value.startDate;
      calendarPro.expiryDate = this.calendarProform.value.expiryDate;
      calendarPro.chrono = this.calendarProform.value.duration;
      calendarPro.address = this.calendarProform.value.address;
      calendarPro.enabled = this.calendarProform.value.enabled;
      calendarPro.weekSchedule = [
        {id: '', name: 'Monday',   seances: this.calendarProform.value.weekSchedule[0]},
        {id: '', name: 'Tuesday',  seances: this.calendarProform.value.weekSchedule[1]},
        {id: '', name: 'Wednesday',seances: this.calendarProform.value.weekSchedule[2]},
        {id: '', name: 'Thursday', seances: this.calendarProform.value.weekSchedule[3]},
        {id: '', name: 'Friday',   seances: this.calendarProform.value.weekSchedule[4]},
        {id: '', name: 'Saturday', seances: this.calendarProform.value.weekSchedule[5]},
        {id: '', name: 'Sunday',   seances: this.calendarProform.value.weekSchedule[6]},
      ];


console.log(this.weekformChanged );

console.log(this.formchng);

    if(this.weekformChanged){

        this.calendarProService.updateSeances(this.id,calendarPro);
      }else {
       this.calendarProService.updateInfo(this.id,calendarPro);

      }

}


private FormOnChanges() {

    this.calendarProform.valueChanges.subscribe(val => {

      this.formchng=true;

    });
    this.calendarProform.get('weekSchedule').valueChanges.subscribe(val=>{
      this.weekformChanged = true;
    })
    this.calendarProform.get('duration').valueChanges.subscribe(val=>{
      this.weekformChanged = true;
    })
  ;


 }


}

