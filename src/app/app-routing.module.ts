import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  { path: '', component: AppComponent ,children:[
      { path: 'home', component: HomeComponent},
      { path: 'login', component:LoginComponent},
      { path: 'sign-up', component:SignUpComponent},
    ] },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
