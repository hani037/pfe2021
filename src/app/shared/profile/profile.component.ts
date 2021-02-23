import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;

  constructor(public userService:UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.userService.userConnected)
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
}
