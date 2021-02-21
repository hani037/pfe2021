import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/service/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router, private userService: UserService) { }

  ngOnInit(): void {
  }
  async login(f:NgForm){
    this.userService.login(f.value.userName, f.value.password).then(user => {
      this.router.navigateByUrl("home")
    });
  }

}
