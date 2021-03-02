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
    {icon:'home',title:'CALENDRIER',path:'home'},
    {icon:'perm_identity',title:'PROFILE',path:'profile'}
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
