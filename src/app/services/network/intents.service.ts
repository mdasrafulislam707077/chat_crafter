import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import getFormattedDateTime from '../../../util/now_time';
import { serverinfo } from './config';

interface Intent {
  name: string;
  botname: string;
  target: string;
}
@Injectable({
  providedIn: 'root',
})
export class IntentsService {
  private apiUrl = serverinfo.server_url;
  constructor(private http: HttpClient) {}
  getIntent(info?: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/intent?user=${info?.name ?? null}&target=${
        info?.target ?? null
      }`
    );
  }
  deleteIntents(
    user: string,
    txt: string,
    name: string
  ): Observable<any> | null {
    if (!(user && txt)) {
      return null;
    }
    return this.http.delete<any>(
      `${this.apiUrl}/intentDeleteItems?user=${user}&txt=${txt}&name=${name}`
    );
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
    return this.http.post<any>(
      `${this.apiUrl}/intent?target=${postData?.target}`,
      payload
    );
  }

  deleteIntent(postId: any, user?: string, target?: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/intent/${postId}?user=${user ?? null}&target=${
        target ?? null
      }`
    );
  }
  getOneIntent(postId: number, user?: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/posts/${postId}?user=${user ?? null}`
    );
  }
  addAlterWordlabel(id: string, wordObj: any): Observable<any> | null {
    const payload = {
      id: id,
      wordObj,
    };
    return this.http.post<any>(
      `${this.apiUrl}/intent/intentWordLabel`,
      payload
    );
  }
  deleteAlterLabel(id:string,wordObj:any):Observable<any> | null{
    const payload = {
      id: id,
      wordObj,
    };
    return this.http.post<any>(
      `${this.apiUrl}/intent/removeAlterlabel`,
      payload
    );
  }
  addAlterWord(id: string, wordObj: any): Observable<any> | null {
    const payload = {
      id: id,
      wordObj,
    };
    return this.http.post<any>(
      `${this.apiUrl}/intent/addAlterWord`,
      payload
    );
  }
  removeAlterWordItem(id: string, wordObj: any): Observable<any> | null {
    const payload = {
      id: id,
      wordObj,
    };
    return this.http.post<any>(
      `${this.apiUrl}/intent/removeAlterWord`,
      payload
    );
  }
}
