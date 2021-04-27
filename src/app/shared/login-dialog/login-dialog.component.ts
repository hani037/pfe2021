import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {NgForm} from "@angular/forms";
import {User} from "../model/user";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  is_login=true;
  is_activated = true;
  is_error = false;
  is_message=false;
  is_message_confirmation=false;
  is_confirmation=false;
  user_crated:User;
  code:string;
  is_code=false;
  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,public router:Router,private activatedRoute:ActivatedRoute, private userService: UserService)
  { }

  ngOnInit(): void {

  }
  async login(f:NgForm){
    this.userService.login(f.value.userName, f.value.password).then(user => {
      console.log(user)
      if(user.enabled){
        this.dialogRef.close();
        this.userService.setToken();
        this.dialogRef.close()
      }else {
        this.is_activated = false;
      }

    }).catch(error=>{
      this.is_error = true;
    });
  }
  async createUser(f:NgForm) {
    this.on();
    const user = new User();
    user.userName = f.value.userName;
    user.firstName = f.value.firstName;
    user.lastName = f.value.lastName;
    user.password = f.value.password;
    user.email = f.value.email;
    user.client = true;
    user.enabled = false;
    this.userService.createUser(user).subscribe(  data => {
      this.off();
      if (data){
        this.user_crated = data;
        this.is_confirmation = true;
      }else {
        this.is_message = true;
      }

    })
  }
  public on() {
    document.getElementById("overlay").style.display = "flex";
  }

  public  off() {
    document.getElementById("overlay").style.display = "none";
  }

  onCodeCompleted(code: string) {
    this.is_code = true;
    this.code = code;
  }

  verify() {
    this.on();
    this.userService.confirmAccount(this.code,this.user_crated).subscribe(data=>{
      if(data){
        this.is_login = true;
      }else {
        this.off();
        this.is_message_confirmation = true;
      }
    });
  }

  changeCode() {
    console.log(this.user_crated);
    this.on();
    this.userService.changeCode(this.user_crated).subscribe(data=>this.off());
  }

  signUp() {
    this.is_login = false;
  }
}
