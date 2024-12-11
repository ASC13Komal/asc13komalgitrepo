import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, Doctor, Hospital, Patient, Review } from '../model/hcms.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/api/reviews'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}


  // Fetch reviews
  getReview(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl);
}

createReview(review: Review): Observable<any> {
    return this.http.post<any>(this.baseUrl, review);
}
deleteReview(id:string):Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
// searchReview(id: string) {
//   return this.http.get<Review[]>(`${this.baseUrl}/${id}`);
// }
searchReview(query: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/search`, { params: { query } });
}
}
