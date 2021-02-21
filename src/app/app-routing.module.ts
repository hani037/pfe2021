import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";
import {ConnectActivate} from "./shared/activate/auth-activate";
import {LoginActivate} from "./shared/activate/login.activate";


const routes: Routes = [
  { path: '', component: AppComponent ,children:[
      { path: 'home', component: HomeComponent,canActivate:[ConnectActivate]},
      { path: 'login', component:LoginComponent,canActivate:[LoginActivate]},
      { path: 'sign-up', component:SignUpComponent,canActivate:[LoginActivate]},
    ] },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
