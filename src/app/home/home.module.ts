import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPersonalComponent } from './calendar-personal/calendar-personal.component';
import { CalendarGroupComponent } from './calendar-group/calendar-group.component';
import { CalendarProComponent } from './calendar-pro/calendar-pro.component';
import {MatFabMenuModule} from "@angular-material-extensions/fab-menu";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AppModule} from "../app.module";
import {homeRoutes} from "./home-routing.module";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [CalendarPersonalComponent, CalendarGroupComponent, CalendarProComponent],
  imports: [
    RouterModule.forChild(homeRoutes),
    CommonModule,
    MatFabMenuModule,
    FullCalendarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class HomeModule { }
