import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverinfo } from './config';
@Injectable({
  providedIn: 'root',
})
export class BotStatusService {
  constructor(private http: HttpClient) {}

  getBotList(): Observable<any> | null {
    return this.http.get<any>(`${serverinfo.server_url}/bot/status`);
  }
  onChangeBotDev(info:any): Observable<any> | null {
    const payload = {
      name: info.name,
      status:info?.status??"CHECK_STATUS"
    };
    return this.http.post<any>(`${serverinfo.server_url}/bot/status/changeStatus`, payload);
  }
  deleteBotItem(name: string): Observable<any> | null {
    return this.http.delete<any>(`${serverinfo.server_url}/bot/status/${name}`);
  }

  createBotName(info: any): Observable<any> | null {
    const payload = {
      name: info.name,
      timeS: Date.now(),
    };
    return this.http.post<any>(`${serverinfo.server_url}/bot/status`, payload);
  }
}
