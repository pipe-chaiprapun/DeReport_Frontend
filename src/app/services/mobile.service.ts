import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MobileService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public baseUrl = `http://localhost:58465`;  // don't use local in case of cross domain or ip address
  private profileUrl = `${this.baseUrl}/api/customer/profile`;
  private contractUrl = `${this.baseUrl}/api/customer/contract`;
  private contractPayment = `${this.baseUrl}/api/customer/payment`;

  constructor(private http: HttpClient) { }

  getProfile(id): Observable<any> {
    return this.http.get<any[]>(`${this.profileUrl}?id=${id}`, { headers: this.headers });
  }
  getContract(id): Observable<any> {
    return this.http.get<any[]>(`${this.contractUrl}?id=${id}`, { headers: this.headers });
  }
  getContractPayment(no): Observable<any> {
    return this.http.get<any[]>(`${this.contractPayment}?no=${no}`, { headers: this.headers });
  }

}
