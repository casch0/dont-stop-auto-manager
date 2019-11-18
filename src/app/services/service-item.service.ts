import { Injectable } from '@angular/core';
import { ServiceItem } from '../models/serviceItem';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceItemService {
  serviceList: ServiceItem[]; //users vehicles
  servicesURL = 'api/services';

  ngOnInit(){
    this.serviceList = null;
  }

  constructor(
    private http: HttpClient
  ) { }  

  async getServiceItem(id: String){
    return this.http.get<ServiceItem>(`${this.servicesURL}/${id}`).toPromise();
  }

  async getVehicleServices(id: String){
    return this.http.get<ServiceItem[]>(`${this.servicesURL}/?vehicle_id=${id}`).toPromise();
  }
}
