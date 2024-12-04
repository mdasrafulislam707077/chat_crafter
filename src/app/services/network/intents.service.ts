import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import getFormattedDateTime from '../../../util/now_time';
import { serverinfo } from './config';
interface Intent {
  name: string;
  botname: string;
}
@Injectable({
  providedIn: 'root',
})
export class IntentsService {
  private apiUrl = serverinfo.server_url;
  constructor(private http: HttpClient) {}
  getIntent(info?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/intent?user=${info?.name ?? null}`);
  }

  injectIntents(postData: any): Observable<any> | null {
    if (!postData.txt) {
      return null;
    }
    const payload = {
      intent: postData.txt,
      profile: 'unset',
      id: postData?.id,
      botname: postData?.botname,
    };
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}/intent/addIntent`, payload);
  }

  fetchIntensInfo(id: string, user?: string): Observable<any> | null {
    return this.http.get<any>(
      `${this.apiUrl}/intent/${id}?user=${user ?? null}`
    );
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
      botname: postData.botname,
    };
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/intent`, payload);
  }

  deleteIntent(postId: any, user?: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/intent/${postId}?user=${user ?? null}`
    );
  }
  getOneIntent(postId: number, user?: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/posts/${postId}?user=${user ?? null}`
    );
  }
}
