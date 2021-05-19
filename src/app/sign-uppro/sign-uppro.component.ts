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
import {DateService} from "../shared/service/date.service";

import * as moment from "moment";

@Component({
  selector: 'app-sign-uppro',
  templateUrl: './sign-uppro.component.html',
  styleUrls: ['./sign-uppro.component.css']
})


export class SignUpproComponent implements OnInit {


  public list:string[]=['médecine','divertissement','sport','maintenance'];
  calendarPro:CalendarPro;
  id:string;
  calendarProForm: FormGroup;
  FormChanged:boolean=false;
  weekFormChanged:boolean =false;
  loading=true;
  private max: Date;
  private min: Date;
  nbClients: boolean=false;
  list2: string[] = ['MONTHLY', 'YEARLY'];
  date;

constructor(private toastrService: ToastService,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder ,private router:Router,private calendarProService:CalendarProService
  ,private dateService:DateService){}

ngOnInit(): void {

  this.min = new Date();
  this.max = new Date(this.min.getFullYear(),this.min.getMonth(),this.min.getDate()+90);
  if(this.activatedRoute.snapshot.params['id']){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCalendarPro();}

  else {
    this.date =new Date(2021,0,1)
  this.InitForms();
  this.loading = false;

}
}

InitForms(){

  this.calendarProForm = this._formBuilder.group({

    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    job:['',Validators.required],
    startDate:[  '', Validators.required],
    enabled: [true, Validators.required],
    expiryDate:[  '', Validators.required],
    duration:  ['', Validators.required],

    exception:this._formBuilder.array([]),
    weekSchedule: this.initWeekSchedule()

  });}


initItemRows() {
return this._formBuilder.group({
  start:['08:00', Validators.required],
  end :['10:00', Validators.required],
  nbTotalPlaces:[1, Validators.required]
});
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


  showSuccess() {

    this.toastrService.success('felicitations votre calendrier a ete bien cree',  {
      duration: 1000,position: "top-left",
  maxToasts: 2,
  newestOnTop: true,
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    });
  }
  showInfo() {

    this.toastrService.info('felicitations votre calendrier a ete bien Modifie',  {
      duration: 1000,
    });
  }

  addInfoToast() {
    this.toastrService.info('message');
 }
addSeance(j:number) {
  let day =this.calendarProForm.get("weekSchedule").get(""+j)as FormArray;
  day.push(this.initItemRows());
}

deleteSeance(j:number,t:number) {
  let day =this.calendarProForm.get("weekSchedule").get(""+j)as FormArray;
  day.removeAt(t);
}

public createCalendarPro(stepper: MatStepper) {
    this.on()
    let calendarPro:CalendarPro =this.generateCalendarPro();
    this.calendarProService.createCalendarPro(calendarPro).subscribe(calendarPro=>{
        this.home();
        this.showSuccess()
        this.addInfoToast();
      });
  }

private  getCalendarPro() {
  this.calendarProService.get_calendarPro(this.id).subscribe(data=>{
this.calendarPro=data;
this.initCalendarProFromCalendarPro().then(r =>{


  this.loading = false;
this.FormOnChanges();} );

  });

}
private  async initCalendarProFromCalendarPro() {

    this.calendarProForm = this._formBuilder.group({
      firstName: [this.calendarPro.firstName, Validators.required],
      lastName: [this.calendarPro.lastName, Validators.required],
      address: [this.calendarPro.address, Validators.required],
      startDate:[ this.calendarPro.startDate , Validators.required],
      expiryDate:  [this.calendarPro.expiryDate, Validators.required],
      duration : [this.calendarPro.chrono, Validators.required],
      job: [this.calendarPro.job, Validators.required],
      enabled: [this.calendarPro.enabled, Validators.required],
      exception:this._formBuilder.array([]),
      weekSchedule: this.initWeekScheduleFromCalendarPro()

    });
    this.calendarPro.exception.forEach((exception,index3)=>{
    let exceptionForm =this.calendarProForm.get("exception")as FormArray;
    exceptionForm.push(this.initExceptionFromCalendar(exception.recurrenceType,exception.date));

  })
      this.calendarPro.weekSchedule.forEach((daySchedule,index2)=>{
      daySchedule.seances.forEach((seance,index3)=>{
        let day =this.calendarProForm.get("weekSchedule").get(""+index2)as FormArray;
         day.push(this.initItemRowsFromCalendar(seance.start,seance.end,seance.nbTotalPlaces));
      })
    });

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

  private initItemRowsFromCalendar(start,end,nbClients) {
    return this._formBuilder.group({
      start:[start, Validators.required],
      end :[end, Validators.required],
      nbTotalPlaces:[nbClients, Validators.required]
    });
  }



async updateCalendarPro( stepper: MatStepper){
  this.on()
  let calendarPro:CalendarPro =this.generateCalendarPro();
      calendarPro.appointment = this.calendarPro.appointment;
      calendarPro.id = this.calendarPro.id;
      console.log(calendarPro)
    if(this.weekFormChanged){
        await this.calendarProService.updateSeances(this.id,calendarPro);
      this.home();
    this.showInfo()
      }else {
       await this.calendarProService.updateInfo(this.id,calendarPro);
      this.home();
     this.showInfo()
      }

}


private FormOnChanges() {

    this.calendarProForm.valueChanges.subscribe(val => {
      this.FormChanged=true;
    });
    this.calendarProForm.get('weekSchedule').valueChanges.subscribe(val=>{
      this.weekFormChanged = true;
    })
    this.calendarProForm.get('duration').valueChanges.subscribe(val=>{
      this.weekFormChanged = true;
    })
  this.calendarProForm.get('exception').valueChanges.subscribe(val=>{
    this.weekFormChanged = true;
  })
  this.calendarProForm.get('firstName').valueChanges.subscribe(val=>{
    this.weekFormChanged = true;
  })



 }


  addClients() {
    this.nbClients = true;
  }

  private generateCalendarPro() {
    let calendarPro = new CalendarPro();
    calendarPro.firstName = this.calendarProForm.value.firstName;
    calendarPro.lastName = this.calendarProForm.value.lastName;
    calendarPro.job = this.calendarProForm.value.job;
    calendarPro.startDate = this.calendarProForm.value.startDate;
    calendarPro.expiryDate = this.calendarProForm.value.expiryDate;
    calendarPro.chrono = this.calendarProForm.value.duration;
    calendarPro.address = this.calendarProForm.value.address;
    calendarPro.enabled = this.calendarProForm.value.enabled;
    calendarPro.exception = [];
    this.calendarProForm.value.exception.forEach(exception=>{
      if(exception.recurrenceType=="YEARLY"){
        calendarPro.exception.push({recurrenceType:exception.recurrenceType,date:this.dateService.getDayAndMonth(new Date(exception.date._d))})
      }else {
        calendarPro.exception.push({recurrenceType:exception.recurrenceType,date:this.dateService.getDay(new Date(exception.date._d))})
      }
    })
    calendarPro.weekSchedule = [

      {id: '', name: 'Monday', seances: this.calendarProForm.value.weekSchedule[0]},
      {id: '', name: 'Tuesday', seances: this.calendarProForm.value.weekSchedule[1]},
      {id: '', name: 'Wednesday', seances: this.calendarProForm.value.weekSchedule[2]},
      {id: '', name: 'Thursday', seances: this.calendarProForm.value.weekSchedule[3]},
      {id: '', name: 'Friday', seances: this.calendarProForm.value.weekSchedule[4]},
      {id: '', name: 'Saturday', seances: this.calendarProForm.value.weekSchedule[5]},
      {id: '', name: 'Sunday', seances: this.calendarProForm.value.weekSchedule[6]},
    ];
    return calendarPro;
  }
  public on() {
    document.getElementById("overlay").style.display = "flex";
  }


  private home() {
    this.router.navigateByUrl('home')
  }

  addException() {
    let exception = this.calendarProForm.get("exception")as FormArray;
    exception.push(this.initException())
  }

  deleteException(i: number) {
    let exception =this.calendarProForm.get("exception")as FormArray;
    exception.removeAt(i);
  }

  private initException() {
    return this._formBuilder.group({
      recurrenceType:['', Validators.required],
      date :[this.date, Validators.required],
    });
  }
  private initExceptionFromCalendar(recurrenceType,date) {
    let date2 =new Date();
    let date1;
    if(recurrenceType=="MONTHLY"){
      date1 = moment(new Date(date2.getFullYear(),0,date));

    }else {
      date1 = moment(new Date(date2.getFullYear(),(date.split('/')[1]-1),date.split('/')[0]));
    }
return this._formBuilder.group({
  recurrenceType:[recurrenceType, Validators.required],
  date :[date1, Validators.required],
});
}
}

