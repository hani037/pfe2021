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
  calendarPro:CalendarPro;
  id:string;
  calendarProForm: FormGroup;
  FormChanged:boolean=false;
  weekFormChanged:boolean =false;
  loading=true;
  private max: Date;
  private min: Date;
  nbClients: boolean=false;

constructor(private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder ,private router:Router,private calendarProService:CalendarProService){}

ngOnInit(): void {
  this.min = new Date();
  this.max = new Date(this.min.getFullYear(),this.min.getMonth(),this.min.getDate()+90);
  if(this.activatedRoute.snapshot.params['id']){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCalendarPro();}

  else {

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

addSeance(j:number) {
  let day =this.calendarProForm.get("weekSchedule").get(""+j)as FormArray;
  day.push(this.initItemRows());
}

deleteSeance(j:number,t:number) {
  let day =this.calendarProForm.get("weekSchedule").get(""+j)as FormArray;
  day.removeAt(t);
}

async createCalendarPro(stepper: MatStepper) {
    this.on()
    let calendarPro:CalendarPro =this.generateCalendarPro();
    this.calendarProService.createCalendarPro(calendarPro).subscribe(
      calendarPro=>{
        this.home();
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
      weekSchedule: this.initWeekScheduleFromCalendarPro()

    });

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



updateCalendarPro( stepper: MatStepper){

  let calendarPro:CalendarPro =this.generateCalendarPro();
      calendarPro.appointment = this.calendarPro.appointment;
      calendarPro.id = this.calendarPro.id;

    if(this.weekFormChanged){

        this.calendarProService.updateSeances(this.id,calendarPro);
      }else {
       this.calendarProService.updateInfo(this.id,calendarPro);

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
}

