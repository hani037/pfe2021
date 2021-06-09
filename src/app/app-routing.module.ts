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
import {EventDisplayComponent} from "./shared/event-display/event-display.component";
import { SignUpproComponent } from './sign-uppro/sign-uppro.component';
import {CreateCalendarGroupComponent} from "./shared/create-calendar-group/create-calendar-group.component";
import {ProfileCalendarProComponent} from "./shared/profile-calendar-pro/profile-calendar-pro.component";
import {FeedComponent} from "./shared/feed/feed.component";
import {HomeModule} from "./home/home.module";
import {ConfigComponent} from "./shared/config/config.component";



const routes: Routes = [

      { path: '',   redirectTo: 'home', pathMatch: 'full'},
      { path: 'config', component: ConfigComponent,canActivate:[ConnectActivate]},
      { path: 'feed', component: FeedComponent,canActivate:[ConnectActivate]},
      { path: 'home', component: HomeComponent,canActivate:[ConnectActivate],
        children: [
          {
            path: '',
            loadChildren:
              './home/home.module#HomeModule'
          }
        ]},
      { path: 'config/CreateCalendarGroup', component: CreateCalendarGroupComponent,canActivate:[ConnectActivate]},
      { path: 'config/CreateCalendarGroup/edit/:id', component: CreateCalendarGroupComponent,canActivate:[ConnectActivate]},
      { path: 'profile', component: ProfileComponent,canActivate:[ConnectActivate]},
      { path: 'group/:id', component: ProfileCalendarProComponent},
      { path: 'event/:id', component: EventDisplayComponent},
      { path: 'search', component: SearchComponent},
      { path: 'search/:position/:service', component: SearchResultComponent},
      { path: 'login', component:LoginComponent,canActivate:[LoginActivate]},
      { path: 'sign-up', component:SignUpComponent,canActivate:[LoginActivate]},
      { path: 'config/calendarPro', component:SignUpproComponent,canActivate:[ConnectActivate]},
      { path: 'config/calendarPro/edit/:id', component:SignUpproComponent,canActivate:[ConnectActivate]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
