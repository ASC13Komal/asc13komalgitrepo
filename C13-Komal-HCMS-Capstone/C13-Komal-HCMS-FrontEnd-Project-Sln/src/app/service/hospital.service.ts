import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Hospital } from '../model/hcms.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private baseUrl = 'http://localhost:8080/api/hospitals'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}


  // Fetch hospitals
  getHospitals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hospitals`);
  }

  // Fetch reviews
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews`);
  }

  createHospital(hospital: Hospital): Observable<void> {
    return this.http.post<void>(this.baseUrl, hospital);
  }
}
