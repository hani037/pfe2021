import { Injectable } from '@angular/core';
import {Appointment} from "../model/appointment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {AppointmentCalendarPro} from "../model/appointmentCalendarPro";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointmentUrl = '/api/v1/appointment';
  AppointmentEmitter = new BehaviorSubject<string>(null);
  constructor(private http:HttpClient) { }
  createAppointment(appointment: Appointment) {
    return this.http.post<Appointment>(this.appointmentUrl, appointment);
  }
  getUserAppointment() {
    return this.http.get<Appointment[]>(this.appointmentUrl);
  }
  getAppointment(id:string) {
    return this.http.get<Appointment>(this.appointmentUrl+'/'+id);
  }
  getUserProAppointment() {
    return this.http.get<Appointment[]>(this.appointmentUrl+'/userPro');
  }
  UpdateStatusAppointment(id:string,status:string,appointment: Appointment) {
    return this.http.put<Appointment>(this.appointmentUrl+"/"+id+'/status/'+status,appointment);
  }

  getAppointmentCalendarPro(id: string) {
    return this.http.get<AppointmentCalendarPro>(this.appointmentUrl+'/calendarPro/'+id);

  }
  updateAll(id: string,status:string) {
    return this.http.put<{}>(this.appointmentUrl+"/"+id+'/updateAll/status/'+status,{});

  }
}
