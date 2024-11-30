import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import getFormattedDateTime from '../../../util/now_time';
import { serverinfo } from './config';
interface Intent {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class IntentsService {
  private apiUrl = serverinfo.server_url;
  constructor(private http: HttpClient) {}
  getIntent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/intent`);
  }
  createIntent(postData: Intent): Observable<any> | null {
    if (!postData.name) {
      return null;
    }
    const getDateData = getFormattedDateTime();
    const payload = {
      name: postData.name,
      profile: 'unset',
      date: getDateData.date,
      day: getDateData.day,
      time: getDateData.time,
    };
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/intent`, payload);
  }

  deleteIntent(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${postId}`);
  }
  getOneIntent(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${postId}`);
  }
}
