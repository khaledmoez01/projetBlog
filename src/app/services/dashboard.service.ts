import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface DashboardResponse {
  article_count: Number;
  user_count: Number;
  comment_count: Number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  countDashboard() {
    return this.http.get<DashboardResponse>(`${environment.uri}/admin/`);
  }
}
