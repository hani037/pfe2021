import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";
import {ConnectActivate} from "./shared/activate/auth-activate";
import {LoginActivate} from "./shared/activate/login.activate";
import {ProfileComponent} from "./shared/profile/profile.component";
import {SearchComponent} from "./shared/search/search.component";
import {SearchResultComponent} from "./shared/search-result/search-result.component";
import {AccountActivateComponent} from "./shared/account-activate/account-activate.component";
import {EventDisplayComponent} from "./shared/event-display/event-display.component";
import { SignUpproComponent } from './sign-uppro/sign-uppro.component';
import {NewcalendarComponent} from "./newcalendar/newcalendar.component";


const routes: Routes = [

      { path: '',   redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent,canActivate:[ConnectActivate]},
      { path: 'home/:id', component: NewcalendarComponent,canActivate:[ConnectActivate]},
      { path: 'home/calendarPro/:id', component: NewcalendarComponent,canActivate:[ConnectActivate]},
      { path: 'profile', component: ProfileComponent,canActivate:[ConnectActivate]},
      { path: 'event/:id', component: EventDisplayComponent},
      { path: 'search', component: SearchComponent,canActivate:[ConnectActivate]},
      { path: 'search/:position/:service', component: SearchResultComponent,canActivate:[ConnectActivate]},
      { path: 'login', component:LoginComponent,canActivate:[LoginActivate]},
      { path: 'sign-up', component:SignUpComponent,canActivate:[LoginActivate]},
      { path: 'sign-uppro', component:SignUpproComponent,canActivate:[ConnectActivate]},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
