import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../shared/model/user';
import { UserService } from '../shared/service/user.service';
import { formatDate } from '@angular/common';
import { CalendarProService } from '../shared/service/calendarPro.service';
import{CalendarPro} from '../shared/model/CalendarPro';
import { Router } from '@angular/router';
import { DaySchedule } from '../shared/model/daySchedule';
import { Seance } from '../shared/model/seance';

interface Post {
  startDate: Date;
  endDate: Date;
}
@Component({
  selector: 'app-sign-uppro',
  templateUrl: './sign-uppro.component.html',
  styleUrls: ['./sign-uppro.component.css']
})
export class SignUpproComponent implements OnInit {


  post: Post = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now())
  }
  isLinear = false;
  firstFormGroup: FormGroup;
  weekFormGroup: FormGroup;

  calendarPro: CalendarPro = new CalendarPro();
  submitted = false
  constructor(private _formBuilder: FormBuilder,public userService:UserService,
    public calendarProService:CalendarProService ,private router: Router) {

  }
  selected:string;
  metiers:any[] =[
    {name: 'Medecin'}, {name: 'Plombier'},  {name: 'electrecien'}, {name: 'Dentiste'}
  ]

  selected1:string;
  dispos:any[] =[{name: 'disponible'},{name: 'ferme'},]

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
    });
    this.weekFormGroup = this._formBuilder.group({
      chrono : ['null', Validators.required],
      job: ['null', Validators.required],

      lundi: this._formBuilder.array([this.initItemRows()]),
      mardi: this._formBuilder.array([this.initItemRows()]),
      mercredi: this._formBuilder.array([this.initItemRows()]),
      jeudi: this._formBuilder.array([this.initItemRows()]),
      vendredi: this._formBuilder.array([this.initItemRows()]),
      samedi: this._formBuilder.array([this.initItemRows()]),
      dimanche: this._formBuilder.array([this.initItemRows()]),
      startDate:  [formatDate(this.post.startDate, 'yyyy-MM-dd', 'en'), Validators.required],
      endDate:  [formatDate(this.post.startDate, 'yyyy-MM-dd', 'en'), Validators.required]   }); }






get formArr() {
return this.weekFormGroup.get('lundi') as FormArray; }
get formArr1() {
return this.weekFormGroup.get('mardi') as FormArray; }
get formArr2() {
return this.weekFormGroup.get('mercredi') as FormArray; }
get formArr3() {
return this.weekFormGroup.get('jeudi') as FormArray; }
get formArr4() {
return this.weekFormGroup.get('vendredi') as FormArray; }
get formArr5() {
return this.weekFormGroup.get('samedi') as FormArray; }
get formArr6() {
return this.weekFormGroup.get('dimanche') as FormArray; }

 initItemRows() {
 return this._formBuilder.group({
start:['08:00', Validators.required],
end :['10:00', Validators.required],
 }); }

 addNewRow() { this.formArr.push(this.initItemRows()) }

 deleteRow(index: number) {  this.formArr.removeAt(index);  }

 addNewRow1() { this.formArr1.push(this.initItemRows()) }

 deleteRow1(index: number) {  this.formArr1.removeAt(index);  }

 addNewRow2() { this.formArr2.push(this.initItemRows()) }

 deleteRow2(index: number) {  this.formArr2.removeAt(index);  }

 addNewRow3() { this.formArr3.push(this.initItemRows()) }

 deleteRow3(index: number) {  this.formArr3.removeAt(index);  }

 addNewRow4() { this.formArr4.push(this.initItemRows()) }

 deleteRow4(index: number) {  this.formArr4.removeAt(index);  }

 addNewRow5() { this.formArr5.push(this.initItemRows()) }

 deleteRow5(index: number) {  this.formArr5.removeAt(index);  }

addNewRow6() { this.formArr6.push(this.initItemRows()) }

deleteRow6(index: number) {  this.formArr6 .removeAt(index);  }




 createCalendarPro( ){



let   weekseance :DaySchedule[] = [
   {id:'', name:'Monday', seances:this.weekFormGroup.value.lundi },
   {id:'', name:'Tuesday', seances:this.weekFormGroup.value.mardi },
   {id:'', name:'Wednesday', seances:this.weekFormGroup.value.mercredi },
   {id:'', name:'Thursday', seances:this.weekFormGroup.value. jeudi},
   {id:'', name:'Friday', seances:this.weekFormGroup.value.vendredi },
   {id:'', name:'Saturday', seances:this.weekFormGroup.value.samedi },
   {id:'', name:'Sunday', seances:this.weekFormGroup.value.dimanche },
];
  const daySchedule = new DaySchedule();

    const calendarPro = new CalendarPro()

    calendarPro.chrono = this.weekFormGroup.value.chrono;
   calendarPro.job = this.weekFormGroup.value.job;
    calendarPro.expiryDate = new Date( "2021-05-23");

    calendarPro.weekSchedule =weekseance;


    calendarPro.lastName =  this.userService.userConnected.lastName;
    calendarPro.firstName =  this.userService.userConnected.firstName;

    console.log(calendarPro)
    this.calendarProService.createCalendarPro(calendarPro).subscribe(
      calendarPro=>{
        this.calendarProService.calendarsPro.push(calendarPro);
        // this.router.navigateByUrl('profile')
         console.log(calendarPro)
      });
 console.log(this.weekFormGroup.value)




console.log(weekseance);

  }


}



