import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";
import {UserService} from "./shared/service/user.service";
declare interface List {
  icon:string,
  title:string,
  path: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'calendrier';
  route_active='';
  index:number= 0;
  public list_calendar:string[]=['CALENDAR 1','CALENDAR 2','CALENDAR 3']
  public list:List[] =[
    {icon:'home_outline',title:'CALENDRIER',path:'home'},
    {icon:'person',title:'PROFILE',path:'profile'},
    {icon:'search',title:'SEARCH',path:'search'}
  ];
  expand: boolean=true;
  constructor(public router:Router,public userService:UserService) {


  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route_active = event.url.replace("/","")
      }
    })
  }
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login')
  }

  navigate(path: string) {

    this.router.navigateByUrl(path);

  }
}
