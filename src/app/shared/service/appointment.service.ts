import { Injectable } from '@angular/core';
import {Appointment} from "../model/appointment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointmentUrl = '/api/v1/appointment';
  AppointmentEmitter = new BehaviorSubject<string>(null);
  constructor(private http:HttpClient) { }
  createAppointment(id:string,appointment: Appointment) {
    return this.http.post<Appointment>(this.appointmentUrl+'/'+id, appointment);
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
  UpdateStatusAppointment(id:string,status:string) {
    return this.http.put<Appointment>(this.appointmentUrl+id+'/status/'+status,{});
  }
}
