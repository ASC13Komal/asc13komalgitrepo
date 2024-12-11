import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Hospital } from '../model/hcms.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'http://localhost:8080/api/doctors'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  // Fetch doctors
  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctors`);
  }

  // Fetch patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  // Fetch appointments
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`);
  }

  // Fetch hospitals
  getHospitals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hospitals`);
  }

  // Fetch reviews
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews`);
  }

 
  createDoctor(doctor: Doctor): Observable<void> {
    return this.http.post<void>(this.baseUrl, doctor);
  }

}
