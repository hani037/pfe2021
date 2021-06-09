import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Calendar} from "../model/calendar";
import {AddValidityComponent} from "../add-validity/add-validity.component";
import {MatDialog} from "@angular/material/dialog";
import {SelectedCalendar} from "../model/selectedCalendar";
import {SelectedCalendarComponent} from "../selected-calendar/selected-calendar.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  is_editfirstname:boolean=false;
  is_editname ; is_editville;  is_editphone; is_editDescr;is_change; is_editmail:boolean=false;
  is_editaddrs:boolean=false;
  is_editnaiss:boolean=false;
  is_editgenre:boolean=false;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  calendarList:Calendar[];

  constructor(public userService:UserService,private _snackBar: MatSnackBar,private _formBuilder: FormBuilder,private dialog: MatDialog) { }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  update_user_name(f:NgForm){
    const user:User = this.userService.userConnected;
    user.firstName = f.value.firstName;
    user.lastName = f.value.lastName;
    this.userService.updateUser(user).then(user=>{
      this.openSnackBar('information changed','close')
      this.userService.me().subscribe();
    })
  }
  update_user_password(f:NgForm){
    const user:User = this.userService.userConnected;
    user.password = f.value.password;

    console.log(f.value.password)
    this.userService.updateUser(user).then(user=>{
      this.openSnackBar('information changed','close')
      f.resetForm();
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  change_calendar() {
    this.dialog.open(SelectedCalendarComponent, {
      backdropClass: 'backdropBackground',
    }).afterClosed().subscribe(data=>{
      if(data){
        this.userService.me().subscribe();
      }
    })
  }
}
