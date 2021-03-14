import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';

import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GoogleMapsModule } from '@angular/google-maps'

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './Interceptors/authInterceptor';
import {NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { AddEventComponent } from './shared/add-event/add-event.component';
import { CalendarComponent } from './shared/calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";

import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UserService} from "./shared/service/user.service";
import { ProfileComponent } from './shared/profile/profile.component';
import { CalendarProfileComponent } from './shared/calendar-profile/calendar-profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import { EventComponent } from './shared/event/event.component';
import {  MatSnackBarModule } from "@angular/material/snack-bar";
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatRadioModule} from "@angular/material/radio";
import {MatChipsModule} from "@angular/material/chips";
import {MatStepperModule} from "@angular/material/stepper";
import { SearchComponent } from './shared/search/search.component';
import { CardSearchComponent } from './shared/card-search/card-search.component';
import { SearchResultComponent } from './shared/search-result/search-result.component';
import { ClientCardComponent } from './shared/client-card/client-card.component';
import {GooglePlacesComponent} from './shared/google-places/google-places.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component'
import {MatProgressBarModule} from "@angular/material/progress-bar";
export const interceptorProviders =
  [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddEventComponent,
    CalendarComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    CalendarProfileComponent,
    EventComponent,
    SidenavComponent,
    SearchComponent,
    CardSearchComponent,
    SearchResultComponent,
    ClientCardComponent,
    GooglePlacesComponent,
    ConfirmationComponent
  ],
    imports: [
        NgxMaterialTimepickerModule,
        BrowserModule,
        GoogleMapsModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MDBBootstrapModule.forRoot(),

        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        FontAwesomeModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        FormsModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        FlexModule,
        MatMenuModule,
        MatTabsModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatListModule,
        MatBadgeModule,
        MatRadioModule,
        MatChipsModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatProgressBarModule

    ],
  providers: [interceptorProviders,MatDatepickerModule,{
    provide: APP_INITIALIZER,
    useFactory: (ds: UserService) =>async () => {
      await ds.autoLogin();
    },
    deps: [UserService],
    multi: true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
