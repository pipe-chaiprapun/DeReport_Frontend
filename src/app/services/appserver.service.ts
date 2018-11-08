import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';
import { Path } from '../models/path';

@Injectable({
  providedIn: 'root'
})
export class AppserverService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseUrl = `http://localhost:1150`;  // don't use local in case of cross domain or ip address
  private apiUrl = `${this.baseUrl}api/v2`;
  private loginUrl = `${this.apiUrl}/login`;
  private logoutUrl = `${this.apiUrl}/logout`;
  private branchUrl = `${this.baseUrl}/branch`;
  private chartUrl = `${this.baseUrl}/chart`;
  private pathUrl = `${this.apiUrl}/path`;
  private reportUrl = `${this.apiUrl}/report`;


  constructor(private http: HttpClient) { }

  getBranchs(): Observable<any[]> {
    return this.http.get<any[]>(this.branchUrl, { headers: this.headers });
  }

  getBranch(brh_id: string): Observable<any> {
    const url = this.branchUrl;
    return this.http.post<any>(url, brh_id, { headers: this.headers });
  }

  getChart(brh_id: string): Observable<any> {
    const url = this.chartUrl;
    return this.http.post<any>(url, brh_id, { headers: this.headers });
  }

}
