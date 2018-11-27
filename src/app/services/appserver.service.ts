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
  private baseUrl = `http://192.168.1.129:8042`;  // don't use local in case of cross domain or ip address
  private apiUrl = `${this.baseUrl}api/v2`;
  // private loginUrl = `${this.apiUrl}/login`;
  // private logoutUrl = `${this.apiUrl}/logout`;
  private branchUrl = `${this.baseUrl}/api/information/getBranch`;
  private saleInfoUrl = `${this.baseUrl}/api/information/getSaleInfo`;
  // private pathUrl = `${this.apiUrl}/path`;
  // private reportUrl = `${this.apiUrl}/report`;
  private getMonthylyMeeting = `${this.baseUrl}/api/information/getMonthlyMeeting`;
  private createNews = `${this.baseUrl}/api/news/createNews`;
  private getnews = `${this.baseUrl}/api/news/getNews`;
  private getCate = `${this.baseUrl}/api/news/getCategory`;


  constructor(private http: HttpClient) { }



  getBranchs(): Observable<any[]> {
    return this.http.get<any[]>(this.branchUrl, { headers: this.headers });
  }
  // getBranch(brh_id: string): Observable<any> {
  //   const url = this.branchUrl;
  //   return this.http.post<any>(url, brh_id, { headers: this.headers });
  // }
  getSaleInfo(): Observable<any> {
    return this.http.get<any[]>(this.saleInfoUrl, { headers: this.headers });
  }
  getBranch(brh_id: string): Observable<any> {
    const url = this.branchUrl + `?branch_id=${brh_id}`;
    return this.http.get<any[]>(url, { headers: this.headers });
  }

  getChart(brh_id: string): Observable<any> {
    return this.http.post<any>(this.saleInfoUrl, brh_id, { headers: this.headers });
  }

  addNews(data: any): Observable<any> {
    return this.http.post<any>(this.createNews, data, {headers: this.headers});
  }

  getNews(): Observable<any> {
    return this.http.get<any[]>(this.getnews, { headers: this.headers });
  }

  getCategory(): Observable<any> {
    return this.http.get<any[]>(this.getCate, { headers: this.headers });
  }

  getMonthlyMeeting(): Observable<any> {
    return this.http.get<any[]>(this.getMonthylyMeeting, { headers: this.headers });
  }


}
