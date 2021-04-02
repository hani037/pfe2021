import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../shared/service/user.service";
import {User} from "../shared/model/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  is_message=false;
  is_message_confirmation=false;
  is_confirmation=false;
  user_crated:User;
  code:string;
  is_code=false;

  constructor(public router:Router, private userService: UserService) { }

  ngOnInit(): void {

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
      this.router.navigateByUrl('login')
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
}
