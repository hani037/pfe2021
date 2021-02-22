import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('login')
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login')
  }

  profile() {
    this.router.navigateByUrl('profile')
  }
}
