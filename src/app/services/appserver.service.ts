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
  public baseUrl = `http://10.192.192.10:8042`;  // don't use local in case of cross domain or ip address
  private apiUrl = `${this.baseUrl}api/v2`;
  // private loginUrl = `${this.apiUrl}/login`;
  // private logoutUrl = `${this.apiUrl}/logout`;
  private branchUrl = `${this.baseUrl}/api/information/getBranch`;
  private saleInfoUrl = `${this.baseUrl}/api/information/getSaleInfo`;
  // private pathUrl = `${this.apiUrl}/path`;
  // private reportUrl = `${this.apiUrl}/report`;
  private getMonthylyMeeting = `${this.baseUrl}/api/information/getMonthlyMeeting`;
  private getPath = `${this.baseUrl}/api/information/getPathInfo`;
  private createNews = `${this.baseUrl}/api/news/createNews`;
  private getnews = `${this.baseUrl}/api/news/getNews`;
  private getCate = `${this.baseUrl}/api/news/getCategory`;
  private delNews = `${this.baseUrl}/api/news/deleteNews`;
  private updateNews = `${this.baseUrl}/api/news/editNews`;
  private addThumbnail = `${this.baseUrl}/api/new/album`;
  public foodMenuDate = new Date('11-12-2018');
  public foodmenu = [
  { "name": "ยำสามกรอบ", "img": "../../../assets/images/food/ยำสามกรอบ.JPG" },
  { "name": "ไข่ดาวลูกเขย", "img": "../../../assets/images/food/eeg.JPG" },
  { "name": "ต้มมะระกระดูกหมู", "img": "../../../assets/images/food/mara.jpg" },
  { "name": "คั่วกลิ้งหมู", "img": "../../../assets/images/food/ped.jpg" },
  { "name": "น้ำส้ม", "img": "../../../assets/images/food/orange].jpg" },
  { "name": "ลูกจากลอยแก้ว", "img": "../../../assets/images/food/lookjak.jpg" }
  ];


  constructor(private http: HttpClient) { }



  getBranchs(): Observable<any[]> {
    return this.http.get<any[]>(this.branchUrl, { headers: this.headers });
  }
  // getBranch(brh_id: string): Observable<any> {
  //   const url = this.branchUrl;
  //   return this.http.post<any>(url, brh_id, { headers: this.headers });
  // }
  getSaleInfo(startDate, endDate): Observable<any> {
    return this.http.get<any[]>(`${this.saleInfoUrl}?startDate=${startDate}&endDate=${endDate}`, { headers: this.headers });
  }
  getBranch(brh_id: string): Observable<any> {
    const url = this.branchUrl + `?branch_id=${brh_id}`;
    return this.http.get<any[]>(url, { headers: this.headers });
  }

  getChart(brh_id: string): Observable<any> {
    return this.http.post<any>(this.saleInfoUrl, brh_id, { headers: this.headers });
  }

  addNews(data: any): Observable<any> {
    return this.http.post<any>(this.createNews, data, { headers: this.headers });
  }

  getNews(): Observable<any> {
    return this.http.get<any[]>(this.getnews, { headers: this.headers });
  }

  deleteNews(data: any): Observable<any> {
    return this.http.post<any>(this.delNews, data, { headers: this.headers });
  }

  editNews(data: any): Observable<any> {
    return this.http.post<any>(this.updateNews, data, { headers: this.headers });
  }

  getCategory(): Observable<any> {
    return this.http.get<any[]>(this.getCate, { headers: this.headers });
  }

  getMonthlyMeeting(startDate, endDate): Observable<any> {
    return this.http.get<any[]>(`${this.getMonthylyMeeting}?startDate=${startDate}&endDate=${endDate}`, { headers: this.headers });
  }

  getPathInfo(startDate, endDate): Observable<any> {
    return this.http.get<any[]>(`${this.getPath}?startDate=${startDate}&endDate=${endDate}`, { headers: this.headers });
  }

  addImgThumbnail(data: any): Observable<any> {
    return this.http.post<any>(this.addThumbnail, data, { headers: this.headers });
  }

}
