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

@Component({
  selector: 'app-create-calendar-group',
  templateUrl: './create-calendar-group.component.html',
  styleUrls: ['./create-calendar-group.component.css']
})
export class CreateCalendarGroupComponent implements OnInit {
  public list:string[]=['médecine','divertissement','sport','maintenance'];
  calendarGroup:CalendarGroup;
  id:string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  FirstGroupChanged:boolean=false;
  NbCalendarPro:number=0;
  SecondGroupChanged:number[];
  SecondFormChanged:boolean=false;
  weekGroupChanged:boolean[];
  loading=true;
  private max: Date;
  private min: Date;
  constructor(private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,private calendarGroupService:CalendarGroupService
              ,private router:Router,private calendarProService:CalendarProService) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']){
      this.id = this.activatedRoute.snapshot.params['id'];
      this.getCalendarGroup();

    }else {
    this.InitForms();
    this.loading = false;

    }


  }
  InitForms(){
    this.min = new Date();
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      job:['',Validators.required],
      startDate:[  '', Validators.required],
      endDate:  ['', Validators.required],
      duration:  ['', Validators.required],
      weekSchedule: this.initWeekSchedule()
    });
    this.secondFormGroup = this._formBuilder.group({
      calendarPro:this._formBuilder.array([this.initCalendarPro()])
    });
  }
initItemRows() {
  return this._formBuilder.group({
    start:['08:00', Validators.required],
    end :['10:00', Validators.required],
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
      let calendarPro = new CalendarPro();
        calendarPro.firstName = data.firstName;
        calendarPro.lastName = data.lastName;
        calendarPro.job = data.job;
        calendarPro.startDate = data.startDate;
        calendarPro.expiryDate = data.endDate;
        calendarPro.chrono = data.duration;
        calendarPro.address = data.address;
        calendarPro.enabled = data.enabled;
      calendarPro.weekSchedule = [
        {id: '', name: 'Monday', seances: data.weekSchedule[0]},
        {id: '', name: 'Tuesday', seances: data.weekSchedule[1]},
        {id: '', name: 'Wednesday', seances: data.weekSchedule[2]},
        {id: '', name: 'Thursday', seances: data.weekSchedule[3]},
        {id: '', name: 'Friday', seances: data.weekSchedule[4]},
        {id: '', name: 'Saturday', seances: data.weekSchedule[5]},
        {id: '', name: 'Sunday', seances: data.weekSchedule[6]},
      ];
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
      console.log(data);
      this.calendarGroup = data;
      this.SecondGroupChanged = new Array(this.calendarGroup.calendarProList.length).fill(0)
      this.weekGroupChanged = new Array(this.calendarGroup.calendarProList.length).fill(false)
      this.InitFormsFromCalendarGroup().then(r =>this.loading = false );

    })

  }

   private async InitFormsFromCalendarGroup() {
    this.firstFormGroup = this._formBuilder.group({
      name: [this.calendarGroup.name, Validators.required],
      address: [this.calendarGroup.address, Validators.required],

    });

    this.secondFormGroup = this._formBuilder.group({
      calendarPro: this._formBuilder.array([])
    });
    await this.calendarGroup.calendarProList.forEach((calendarPro, index) => {
      this.calendarPro.push(this.initCalendarProFromCalendarGroup(calendarPro))
      calendarPro.weekSchedule.forEach((daySchedule,index2)=>{
        daySchedule.seances.forEach((seance,index3)=>{
          let day =this.calendarPro.get(''+index).get("weekSchedule").get(""+index2)as FormArray;
          day.push(this.initItemRowsFromCalendar(seance.start,seance.end));

        })
      })
    });
     this.FormOnChanges();



  }
  InitWeek(index){
    console.log(this.firstFormGroup.value.weekSchedule)
    this.firstFormGroup.value.weekSchedule.forEach((daySchedule,index2)=>{
      daySchedule.forEach((seance,index3)=>{
        let day =this.calendarPro.get(''+index).get("weekSchedule").get(""+index2)as FormArray;
        day.push(this.initItemRowsFromCalendar(seance.start,seance.end));

      })
    })
  }

  private initCalendarProFromCalendarGroup(calendarPro:CalendarPro) {

      return this._formBuilder.group({
        firstName: [calendarPro.firstName, Validators.required],
        lastName: [calendarPro.lastName, Validators.required],
        address: [calendarPro.address, Validators.required],
        startDate:[ calendarPro.startDate , Validators.required],
        endDate:  [calendarPro.expiryDate, Validators.required],
        duration : [calendarPro.chrono, Validators.required],
        job: [calendarPro.job, Validators.required],
        enabled: [calendarPro.enabled, Validators.required],
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

  private initItemRowsFromCalendar(start,end) {
    return this._formBuilder.group({
      start:[start, Validators.required],
      end :[end, Validators.required],
    });
  }
  startChanged(startDate) {
    this.max = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+60);
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
    if(this.calendarPro.length > this.calendarGroup.calendarProList.length){
      for (let i = this.calendarGroup.calendarProList.length; i < this.calendarPro.length; i++) {
        let calendarPro = new CalendarPro();
        calendarPro.firstName = this.calendarPro.get(''+i).value.firstName;
        calendarPro.lastName = this.calendarPro.get(''+i).value.lastName;
        calendarPro.job = this.calendarPro.get(''+i).value.job;
        calendarPro.startDate = this.calendarPro.get(''+i).value.startDate;
        calendarPro.expiryDate = this.calendarPro.get(''+i).value.endDate;
        calendarPro.chrono = this.calendarPro.get(''+i).value.duration;
        calendarPro.address = this.calendarPro.get(''+i).value.address;
        calendarPro.enabled = this.calendarPro.get(''+i).value.enabled;
        calendarPro.weekSchedule = [
          {id: '', name: 'Monday', seances: this.calendarPro.get(''+i).value.weekSchedule[0]},
          {id: '', name: 'Tuesday', seances: this.calendarPro.get(''+i).value.weekSchedule[1]},
          {id: '', name: 'Wednesday', seances: this.calendarPro.get(''+i).value.weekSchedule[2]},
          {id: '', name: 'Thursday', seances: this.calendarPro.get(''+i).value.weekSchedule[3]},
          {id: '', name: 'Friday', seances: this.calendarPro.get(''+i).value.weekSchedule[4]},
          {id: '', name: 'Saturday', seances: this.calendarPro.get(''+i).value.weekSchedule[5]},
          {id: '', name: 'Sunday', seances: this.calendarPro.get(''+i).value.weekSchedule[6]},
        ];
        await this.calendarGroupService.addCalendarPro(this.calendarGroup.id,calendarPro);
      }
    }
    for (const data of this.calendarGroup.calendarProList) {
      let index = this.calendarGroup.calendarProList.indexOf(data);
      if (this.SecondGroupChanged[index]<=1){
        continue;
      }
      let calendarPro = data;
      calendarPro.firstName = this.calendarPro.get(''+index).value.firstName;
      calendarPro.lastName = this.calendarPro.get(''+index).value.lastName;
      calendarPro.job = this.calendarPro.get(''+index).value.job;
      calendarPro.startDate = this.calendarPro.get(''+index).value.startDate;
      calendarPro.expiryDate = this.calendarPro.get(''+index).value.endDate;
      calendarPro.chrono = this.calendarPro.get(''+index).value.duration;
      calendarPro.address = this.calendarPro.get(''+index).value.address;
      calendarPro.enabled = this.calendarPro.get(''+index).value.enabled;
      calendarPro.weekSchedule = [
        {id: '', name: 'Monday', seances: this.calendarPro.get(''+index).value.weekSchedule[0]},
        {id: '', name: 'Tuesday', seances: this.calendarPro.get(''+index).value.weekSchedule[1]},
        {id: '', name: 'Wednesday', seances: this.calendarPro.get(''+index).value.weekSchedule[2]},
        {id: '', name: 'Thursday', seances: this.calendarPro.get(''+index).value.weekSchedule[3]},
        {id: '', name: 'Friday', seances: this.calendarPro.get(''+index).value.weekSchedule[4]},
        {id: '', name: 'Saturday', seances: this.calendarPro.get(''+index).value.weekSchedule[5]},
        {id: '', name: 'Sunday', seances: this.calendarPro.get(''+index).value.weekSchedule[6]},
      ];
      if(this.weekGroupChanged[index]){
        await this.calendarProService.updateSeances(calendarPro.id,calendarPro);
      }else {
        await this.calendarProService.updateInfo(calendarPro.id,calendarPro);

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
        if(this.SecondGroupChanged[index]==1){

          this.SecondFormChanged = true;
          this.SecondGroupChanged[index]++;
        }else {
          this.SecondGroupChanged[index]++;
        }
      });
      this.calendarPro.get(''+index).get('weekSchedule').valueChanges.subscribe(val=>{
        this.weekGroupChanged[index] = true;
      })
      this.calendarPro.get(''+index).get('duration').valueChanges.subscribe(val=>{
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
}

