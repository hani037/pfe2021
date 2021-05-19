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
import { AddEventComponent, CustomDateFormat1,
  CustomDateFormat2} from './shared/add-event/add-event.component';
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
import {GooglePlacesComponent} from './shared/google-places/google-places.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component'
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { AppointmentComponent } from './shared/appointment/appointment.component';
import { AccountActivateComponent } from './shared/account-activate/account-activate.component';
import { EventDisplayComponent } from './shared/event-display/event-display.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NewcalendarComponent } from './newcalendar/newcalendar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CodeInputModule } from 'angular-code-input';
import { ClientCardCalendarComponent } from './shared/client-card-calendar/client-card-calendar.component';
import { SignUpproComponent } from './sign-uppro/sign-uppro.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatFabMenuModule} from "@angular-material-extensions/fab-menu";
import { AddCalendarComponent } from './shared/add-calendar/add-calendar.component';
import { SearchByDateComponent } from './shared/search-by-date/search-by-date.component';
import { CardCalendarComponent } from './shared/card-calendar/card-calendar.component';
import { CardCalendarProComponent } from './shared/card-calendar-pro/card-calendar-pro.component';
import { CalendarProComponent } from './shared/calendar-pro/calendar-pro.component';
import { AppointmentProComponent } from './shared/appointment-pro/appointment-pro.component';
import { SeanceProComponent } from './shared/seance-pro/seance-pro.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { CreateVacationComponent } from './shared/create-vacation/create-vacation.component';
import { LoginDialogComponent } from './shared/login-dialog/login-dialog.component';
import { JoinComponent } from './shared/join/join.component';
import { CreateCalendarGroupComponent } from './shared/create-calendar-group/create-calendar-group.component';
import { CardCalendarGroupComponent } from './shared/card-calendar-group/card-calendar-group.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { CalendarGroupComponent } from './shared/calendar-group/calendar-group.component';
import { ProfileCalendarProComponent } from './shared/profile-calendar-pro/profile-calendar-pro.component';
import { AddSeanceComponent } from './shared/add-seance/add-seance.component';
import { AddValidityComponent } from './shared/add-validity/add-validity.component';
import { ToastModule, ToastService } from 'ng-uikit-pro-standard';
import { AngularToastifyModule } from 'angular-toastify';
import { LibToastifyToastContainerComponent } from './lib-toastify-toast-container/lib-toastify-toast-container.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])
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
    GooglePlacesComponent,
    ConfirmationComponent,
    AppointmentComponent,
    AccountActivateComponent,
    EventDisplayComponent,
    NewcalendarComponent,
    ClientCardCalendarComponent,
    SignUpproComponent,
    AddCalendarComponent,
    SearchByDateComponent,
    CardCalendarComponent,
    CardCalendarProComponent,
    CalendarProComponent,
    AppointmentProComponent,
    SeanceProComponent,
    CreateVacationComponent,
    LoginDialogComponent,
    JoinComponent,
    CreateCalendarGroupComponent,
    CardCalendarGroupComponent,
    CalendarGroupComponent,
    ProfileCalendarProComponent,
    AddSeanceComponent,
    AddValidityComponent,
    CustomDateFormat2,
    CustomDateFormat1,
    LibToastifyToastContainerComponent
  ],
    imports: [
      AngularToastifyModule,
        NgxMaterialTimepickerModule,
        CodeInputModule,
        BrowserModule,
        GoogleMapsModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        FullCalendarModule,
        CdkStepperModule,
        MDBBootstrapModule.forRoot(),
        ToastModule.forRoot(),
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
        MatProgressBarModule,
        MatSelectModule,
        MatFabMenuModule,
        MatPaginatorModule,
        MatSlideToggleModule,

    ],
  providers:   [interceptorProviders,ToastService,MatDatepickerModule,{
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
