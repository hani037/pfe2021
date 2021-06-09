import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {ConnectActivate} from "../shared/activate/auth-activate";
import {CalendarGroupComponent} from "./calendar-group/calendar-group.component";
import {CalendarProComponent} from "./calendar-pro/calendar-pro.component";
import {CalendarPersonalComponent} from "./calendar-personal/calendar-personal.component";


export const homeRoutes: Routes = [


  { path: 'calendarPersonal/:id', component: CalendarPersonalComponent},
  { path: 'calendarPro/:id', component: CalendarProComponent},
  { path: 'calendarGroup/:id', component: CalendarGroupComponent},

]



