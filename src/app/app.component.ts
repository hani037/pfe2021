import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";
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
  public list:List[] =[
    {icon:'home_outline',title:'CALENDRIER',path:'home'},
    {icon:'person',title:'PROFILE',path:'profile'},
    {icon:'logout',title:'LOG OUT',path:'login'}
  ];
  expand: boolean=true;
  constructor(public router:Router,public activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.route_active = event.url.replace("/","")
      }
    })
  }
}
