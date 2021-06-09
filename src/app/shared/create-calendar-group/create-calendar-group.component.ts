import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarGroupService} from "../service/calendar-group.service";
import {CalendarGroup} from "../model/calendarGroup";
import {MatHorizontalStepper, MatStepper} from '@angular/material/stepper';
import {CalendarPro} from "../model/CalendarPro";
import {DaySchedule} from "../model/daySchedule";
import {ActivatedRoute, Router} from "@angular/router";
import {getCalendar} from "@angular/material/datepicker/testing/datepicker-trigger-harness-base";
import {CalendarProService} from "../service/calendarPro.service";
import {DateService} from "../service/date.service";
import * as moment from "moment";
import {Admin} from "../model/admin";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-create-calendar-group',
  templateUrl: './create-calendar-group.component.html',
  styleUrls: ['./create-calendar-group.component.css']
})
export class CreateCalendarGroupComponent implements OnInit {

  public list:string[]=['medicine','entertainment','sport','maintenance'];
  list2: string[] = ['MONTHLY', 'YEARLY'];
  calendarGroup:CalendarGroup;
  id:string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  FirstGroupChanged:boolean=false;
  nbClients:boolean=false;
  NbCalendarPro:number=0;
  SecondGroupChanged:boolean[];
  SecondFormChanged:boolean=false;
  weekGroupChanged:boolean[];
  loading=true;
  private max: Date;
  private min: Date;
  private date: Date;

  constructor(private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,private calendarGroupService:CalendarGroupService
              ,private router:Router,private calendarProService:CalendarProService,private dateService:DateService,private userService:UserService) { }

  ngOnInit(): void {
    this.min = new Date();
    this.max = new Date(this.min.getFullYear(),this.min.getMonth(),this.min.getDate()+90);
    if(this.activatedRoute.snapshot.params['id']){
      this.id = this.activatedRoute.snapshot.params['id'];
      this.getCalendarGroup();

    }else {
      this.date =new Date(2021,0,1)
    this.InitForms();
    this.loading = false;

    }


  }
  InitForms(){

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      job:['',Validators.required],
      startDate:[  '', Validators.required],
      endDate:  ['', Validators.required],
      duration:  ['', Validators.required],
      follow: [false, Validators.required],
      videoConsultation: [false, Validators.required],
      exception:this._formBuilder.array([]),
      weekSchedule: this.initWeekSchedule(),
      admins: this._formBuilder.array([this.initFirstAdmin()])
    });
    this.secondFormGroup = this._formBuilder.group({
      calendarPro:this._formBuilder.array([this.initCalendarPro()])
    });
  }
initItemRows() {
  return this._formBuilder.group({
    start:['08:00', Validators.required],
    end :['10:00', Validators.required],
    nbTotalPlaces:[1, Validators.required]
  }); }
  initCalendarPro() {
    return this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      startDate:[ '', Validators.required],
      endDate:  ['', Validators.required],
      duration : ['', Validators.required],
      job: ['', Validators.required],
      enabled: [true, Validators.required],
      follow: [false, Validators.required],
      videoConsultation: [false, Validators.required],
      exception:this._formBuilder.array([]),
      weekSchedule: this.initWeekScheduleFromCalendarGroup()
    }); }
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
    get calendarPro() {
    return this.secondFormGroup.get('calendarPro') as FormArray; }

    addCalendar(){
    this.calendarPro.push(this.initCalendarPro());
    this.InitWeek(this.calendarPro.length-1)
      if(this.id){
       this.NbCalendarPro++;
      }
    }

  addSeance(i:number,j:number) {
    let day =this.calendarPro.get(''+i).get("weekSchedule").get(""+j)as FormArray;
    day.push(this.initItemRows());
  }

  deleteSeance(i:number,j:number,t:number) {
    let day =this.calendarPro.get(''+i).get("weekSchedule").get(""+j)as FormArray;
    day.removeAt(t);
  }

  removeCalendarPro(i: number) {
    this.calendarPro.removeAt(i);
    if(this.id){
      this.NbCalendarPro--;
    }
  }

  createCalendarGroup(stepper: MatStepper) {
    this.on();
    let calendarGroup = new CalendarGroup();
    calendarGroup.name = this.firstFormGroup.value.name;
    calendarGroup.address = this.firstFormGroup.value.address;
    calendarGroup.admins = [];
    this.firstFormGroup.value.admins.forEach(admin=>{
      calendarGroup.admins.push({id:'',email:admin.email,calendarProID:''})
    })
    calendarGroup.lat = 10;
    calendarGroup.lon = 10;
    this.calendarGroupService.createCalendarGroup(calendarGroup).subscribe(data=>{
      this.calendarGroup = data;
      this.InitWeek(0);
      this.off();
      stepper.next();
    })
  }
  public on() {
    document.getElementById("overlay").style.display = "flex";
  }

  public  off() {
    document.getElementById("overlay").style.display = "none";
  }

  async createCalendarsPro(stepper: MatStepper) {
    this.on();
    for (const data of this.calendarPro.value) {
      let calendarPro:CalendarPro =this.generateCalendarPro(data);
       await this.calendarGroupService.addCalendarPro(this.calendarGroup.id,calendarPro);
    }
    this.off();
    this.home();

  }

  home() {
      this.router.navigateByUrl('home')
  }

  private getCalendarGroup() {
    this.calendarGroupService.get_calendar(this.id).subscribe(data=>{
      this.calendarGroup = data;
      this.SecondGroupChanged = new Array(this.calendarGroup.calendarProList.length).fill(false)
      this.weekGroupChanged = new Array(this.calendarGroup.calendarProList.length).fill(false)
      this.InitFormsFromCalendarGroup().then(r =>this.loading = false );

    })

  }

   private async InitFormsFromCalendarGroup() {
    this.firstFormGroup = this._formBuilder.group({
      name: [this.calendarGroup.name, Validators.required],
      address: [this.calendarGroup.address, Validators.required],
      admins: this._formBuilder.array([])

    });
     this.calendarGroup.admins.forEach((admin,index3)=>{
       let admins =this.firstFormGroup.get("admins")as FormArray;
       admins.push(this.initAdminFromCalendar(admin));

     })
    this.secondFormGroup = this._formBuilder.group({
      calendarPro: this._formBuilder.array([])
    });
    await this.calendarGroup.calendarProList.forEach((calendarPro, index) => {
      this.calendarPro.push(this.initCalendarProFromCalendarGroup(calendarPro))
      calendarPro.exception.forEach((exception,index3)=>{
        let exceptionForm =this.calendarPro.get(''+index).get("exception")as FormArray;
        exceptionForm.push(this.initExceptionFromCalendar(exception.recurrenceType,exception.date));

      })
      calendarPro.weekSchedule.forEach((daySchedule,index2)=>{
        daySchedule.seances.forEach((seance,index3)=>{
          let day =this.calendarPro.get(''+index).get("weekSchedule").get(""+index2)as FormArray;
          day.push(this.initItemRowsFromCalendar(seance.start,seance.end,seance.nbTotalPlaces));

        })

      })
    });
     this.FormOnChanges();



  }
  InitWeek(index){
    this.firstFormGroup.value.exception.forEach((exception,index2)=>{
        let exceptionForm =this.calendarPro.get(''+index).get("exception")as FormArray;
        exceptionForm.push(this.initExceptionFromForm(exception.recurrenceType,exception.date));
    })
    this.firstFormGroup.value.weekSchedule.forEach((daySchedule,index2)=>{
      daySchedule.forEach((seance,index3)=>{
        let day =this.calendarPro.get(''+index).get("weekSchedule").get(""+index2)as FormArray;
        day.push(this.initItemRowsFromCalendar(seance.start,seance.end,seance.nbTotalPlaces));

      })
    })
  }

  private initCalendarProFromCalendarGroup(calendarPro:CalendarPro) {
    let date = new Date(calendarPro.expiryDate);
    let start=new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
      return this._formBuilder.group({
        firstName: [calendarPro.firstName, Validators.required],
        lastName: [calendarPro.lastName, Validators.required],
        address: [calendarPro.address, Validators.required],
        startDate:[ start , Validators.required],
        endDate:  ['', Validators.required],
        duration : [calendarPro.chrono, Validators.required],
        job: [calendarPro.job, Validators.required],
        enabled: [calendarPro.enabled, Validators.required],
        follow: [calendarPro.follow, Validators.required],
        videoConsultation: [calendarPro.videoConsultation, Validators.required],
        exception:this._formBuilder.array([]),
        weekSchedule: this.initWeekScheduleFromCalendarGroup()
      });

  }
  initWeekScheduleFromCalendarGroup(){
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


  updateCalendarGroup(stepper: MatStepper) {
      this.on();
      this.calendarGroup.name = this.firstFormGroup.value.name;
      this.calendarGroup.address = this.firstFormGroup.value.address;
      this.calendarGroup.lat = 10;
      this.calendarGroup.lon = 10;
      this.calendarGroupService.updateCalendarGroup(this.calendarGroup).subscribe(data=>{
        this.calendarGroup = data;
        this.off();
        stepper.next();
      })
  }

  async updateCalendarsPro(stepper: MatStepper) {


    this.on();
    for (const data of this.calendarGroup.calendarProList) {
      let index = this.calendarGroup.calendarProList.indexOf(data);
      if (!this.SecondGroupChanged){
        continue;
      }
      let calendarPro = this.generateCalendarPro(this.calendarPro.get(""+index).value);
      calendarPro.appointment = data.appointment;
      calendarPro.id = data.id;
      let startDate= new Date(this.calendarGroup.calendarProList[index].startDate);
      let expiryDate= new Date(this.calendarGroup.calendarProList[index].expiryDate);
      if(this.weekGroupChanged[index]||calendarPro.startDate.getTime()!=startDate.getTime()||calendarPro.expiryDate.getTime()!=expiryDate.getTime()){
        await this.calendarProService.updateSeances(data.id,calendarPro);
      }else if(this.SecondGroupChanged[index]) {
        await this.calendarProService.updateInfo(data.id,calendarPro);

      }

    }
    this.off();
    this.home();

  }

  private FormOnChanges() {
    this.firstFormGroup.valueChanges.subscribe(val => {
     this.FirstGroupChanged = true;
    });
    this.SecondGroupChanged.forEach((data,index)=>{
      this.calendarPro.get(''+index).valueChanges.subscribe(val => {
          this.SecondFormChanged = true;
          this.SecondGroupChanged[index] = true;
        })
      this.calendarPro.get(''+index).get('weekSchedule').valueChanges.subscribe(val=>{
        this.weekGroupChanged[index] = true;
      })
      this.calendarPro.get(''+index).get('duration').valueChanges.subscribe(val=>{
        this.weekGroupChanged[index] = true;
      })
      this.calendarPro.get(''+index).get('exception').valueChanges.subscribe(val=>{
        this.weekGroupChanged[index] = true;
      })
      });

  }

  deleteSeanceFirstForm(j: number, t: number) {
    let day =this.firstFormGroup.get("weekSchedule").get(""+j)as FormArray;
    day.removeAt(t);
  }

  addSeanceFirstForm(j: number) {
    let day =this.firstFormGroup.get("weekSchedule").get(""+j)as FormArray;
    day.push(this.initItemRows());
  }

  addClients() {
    this.nbClients = true;
  }

  private generateCalendarPro(data) {
    let calendarPro = new CalendarPro();
    calendarPro.firstName = data.firstName;
    calendarPro.lastName = data.lastName;
    calendarPro.job = data.job;
    calendarPro.startDate = data.startDate;
    calendarPro.expiryDate = data.endDate;
    calendarPro.chrono = data.duration;
    calendarPro.address = data.address;
    calendarPro.enabled = data.enabled;
    calendarPro.follow = data.follow;
    calendarPro.videoConsultation = data.videoConsultation;
    calendarPro.exception = [];
    calendarPro.admins = [];

     data.exception.forEach(exception=>{
       if(exception.recurrenceType=="YEARLY"){
         calendarPro.exception.push({recurrenceType:exception.recurrenceType,date:this.dateService.getDayAndMonth(new Date(exception.date._d))})
       }else {
         calendarPro.exception.push({recurrenceType:exception.recurrenceType,date:this.dateService.getDay(new Date(exception.date._d))})
       }
     })
    calendarPro.weekSchedule = [
      {id: '', name: 'Monday', seances: data.weekSchedule[0]},
      {id: '', name: 'Tuesday', seances: data.weekSchedule[1]},
      {id: '', name: 'Wednesday', seances: data.weekSchedule[2]},
      {id: '', name: 'Thursday', seances: data.weekSchedule[3]},
      {id: '', name: 'Friday', seances: data.weekSchedule[4]},
      {id: '', name: 'Saturday', seances: data.weekSchedule[5]},
      {id: '', name: 'Sunday', seances: data.weekSchedule[6]},
    ];
    return calendarPro;
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
  private initExceptionFromForm(recurrenceType,date) {
    return this._formBuilder.group({
      recurrenceType:[recurrenceType, Validators.required],
      date :[date, Validators.required],
    });
  }
  private initException() {
    return this._formBuilder.group({
      recurrenceType:['', Validators.required],
      date :[this.date, Validators.required],
    });
  }
  addException() {
  let exception = this.firstFormGroup.get("exception")as FormArray;
  exception.push(this.initException())
  }

  addExceptionForCalendarPro(i: number) {
    let exception =this.calendarPro.get(''+i).get("exception")as FormArray;
    exception.push(this.initException())
  }
  deleteException(i: number) {
    let exception =this.firstFormGroup.get("exception")as FormArray;
    exception.removeAt(i);
  }
  deleteExceptionFromCalendarPro(i:number,j:number,) {
    let exception =this.calendarPro.get(''+i).get("exception")as FormArray;
    exception.removeAt(j);
  }

  addAdmin() {
    let admins = this.firstFormGroup.get("admins")as FormArray;
    admins.push(this.initAdmin())
  }

  deleteAdmin(j) {
    let admins = this.firstFormGroup.get("admins")as FormArray;
    admins.removeAt(j);
  }

  private initAdminFromCalendar(admin: Admin) {
    return this._formBuilder.group({
      email:[admin.email, Validators.required],
    });
  }
  initAdmin() {
    return this._formBuilder.group({
      email:['', Validators.required],
    });
  }

  private initFirstAdmin() {
    return this._formBuilder.group({
      email:[this.userService.userConnected.email, Validators.required],
    });
  }
}

