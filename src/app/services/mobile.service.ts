import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MobileService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  // public baseUrl = `http://10.192.192.10:9090`;  // don't use local in case of cross domain or ip address
  public baseUrl = `http://35.247.128.114`;  // don't use local in case of cross domain or ip address
  private profileUrl = `${this.baseUrl}/api/customer/profile`;
  private contractUrl = `${this.baseUrl}/api/customer/contract`;
  private contractPayment = `${this.baseUrl}/api/customer/payment`;
  private newPaymentUrl = `${this.baseUrl}/api/payment/newpayment2`;

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
  createPayment(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.newPaymentUrl, data, { headers: this.headers });
  }

}
