import { Injectable } from '@angular/core';
import { ServiceItem } from '../models/serviceItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceItemService {
  serviceList: ServiceItem[]; //users vehicles
  servicesURL = 'http://localhost:8080/servicereports/';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ngOnInit(){
    this.serviceList = null;
    this.httpOptions = this.ls.httpOptions;
  }

  constructor(
    private http: HttpClient,
    private ls : LoginService
  ) { }  

  async getServiceItem(id: String){
    return this.http.get<ServiceItem>(`${this.servicesURL}/${id}`, this.ls.httpOptions).toPromise();
  }

  createServiceItem(s: ServiceItem): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(this.servicesURL, s, this.ls.httpOptions);
  }
  
  updateService(s: ServiceItem): Observable<ServiceItem> {
    return this.http.put<ServiceItem>(this.servicesURL, s, this.ls.httpOptions);
  }

  deleteService(s: ServiceItem){
    // return this.http.delete<ServiceItem>(this.servicesURL, s, this.ls.httpOptions);
  }
}
