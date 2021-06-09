import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {UserService} from "../shared/service/user.service";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  is_activated = true;
  is_error = false;

  constructor(public router:Router,private activatedRoute:ActivatedRoute, private userService: UserService)
               { }

  ngOnInit(): void {

  }
  async login(f:NgForm){
    this.userService.login(f.value.userName, f.value.password).then(user => {
      console.log(user);
      if(user.enabled){
        this.userService.setToken();
          this.router.navigateByUrl("home/"+user.selectedCalendar.calendarType+"/"+user.selectedCalendar.calendarId);
      }else {
        this.is_activated = false;
      }

    }).catch(error=>{
      this.is_error = true;
    });
  }

}
