import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ServiceItem } from '../models/serviceItem';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  
  vehicleList: Vehicle[]; //users vehicles
  vehiclesUrl = 'http://localhost:8080/vehicles';

  ngOnInit(){
    this.vehicleList = null;
    console.log(this.ls.httpOptions.headers);
  }

  constructor(
    private http: HttpClient,
    private ls : LoginService
  ) { }  

  async getVehicle(id: String){
    return this.http.get<Vehicle>(`${this.vehiclesUrl}/${id}`, this.ls.httpOptions).toPromise();
  }

  createVehicle(v: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehiclesUrl, v, this.ls.httpOptions);
  }

  updateVehicle (v: Vehicle): Observable<any> {
    return this.http.put(this.vehiclesUrl, v, this.ls.httpOptions);
  }

  async getVehicleServices(id: String){
    return this.http.get<ServiceItem[]>(`${this.vehiclesUrl}/${id}/servicereports`, this.ls.httpOptions).toPromise();
  }

  uploadPhoto(vId: number, photo : File){
    return this.http.post(`${this.vehiclesUrl}/${vId}/photo`, photo, this.ls.httpOptions);
  }
}
