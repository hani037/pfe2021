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

  constructor(public router:Router, private userService: UserService) { }

  ngOnInit(): void {
  }
  async createUser(f:NgForm) {
    const user = new User();
    user.userName = f.value.userName;
    user.firstName = f.value.firstName;
    user.lastName = f.value.lastName;
    user.password = f.value.password;
    user.email = f.value.email;
    user.client = true;
    this.userService.createUser(user).then(  user => {
      this.router.navigateByUrl("login")
    })
  }
}
