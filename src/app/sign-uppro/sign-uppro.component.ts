import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../shared/model/user';
import { UserService } from '../shared/service/user.service';
import { Listjour } from '../shared/model/dispo';

import { UserProService } from '../shared/service/userPro.service';
import{UserPro} from '../shared/model/userPro';
@Component({
  selector: 'app-sign-uppro',
  templateUrl: './sign-uppro.component.html',
  styleUrls: ['./sign-uppro.component.css']
})
export class SignUpproComponent implements OnInit {

addtime:boolean=false;
campaignOne: FormGroup;
campaignTwo: FormGroup;
listjours: Listjour = { disponible:[  {name:'lundi',seances:[{  debut:'',fin:'' }]},

 {name:'mardi',seances:[{  debut:'',fin:'' }]},{name:'Mercredi',seances:[{  debut:'',fin:'' }]}
 ,{name:'jeudi',seances:[{  debut:'',fin:'' }]} ,{name:'Vendredi',seances:[{  debut:'',fin:'' }]}
 ,{name:'samedi',seances:[{  debut:'',fin:'' }]} ,{name:'dimanche',seances:[{  debut:'',fin:'' }]} ]   ,dureseance:'',} ;

  user:User;
  isLinear = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  public addmore: FormGroup;
  constructor(private _fb: FormBuilder,private _formBuilder: FormBuilder,public userService:UserService,private _snackBar: MatSnackBar,private fb:FormBuilder,UserProService:UserProService) {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }


  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.addmore = this._fb.group({
  	  namej:[''],
  	  statut:[''],
  	  duree:[''],
      itemRows: this._fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
    namej:[''],
    debut:[''],
    fin :[''],

    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }


}



