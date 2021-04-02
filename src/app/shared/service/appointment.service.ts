import { Injectable } from '@angular/core';
import {Appointment} from "../model/appointment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointmentUrl = '/api/v1/appointment';
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
  UpdateStatusAppointment(id:string,status:string) {
    return this.http.put<Appointment>(this.appointmentUrl+id+'/status/'+status,{});
  }
}
