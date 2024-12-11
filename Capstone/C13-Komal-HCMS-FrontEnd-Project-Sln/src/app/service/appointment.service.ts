import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, Doctor, Hospital, Patient } from '../model/hcms.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/appointments'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  //Fetch Appointments
getAppointment(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.baseUrl);
}
getAppointmentById(id: string) {
  return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
}

createAppointment(appointment:Appointment): Observable<any> {
    return this.http.post<any>(this.baseUrl, appointment);
}

updateAppointment(id:string, appointment:any) {
       
  return this.http.put(`${this.baseUrl}/${id}`, appointment);
}

deleteAppointment(id: string): Observable<void>{
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}   

searchAppointment(query: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/search`, { params: {query} });
}

}
