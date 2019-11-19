import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  
  vehicleList: Vehicle[]; //users vehicles
  vehiclesUrl = 'api/vehicles';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ngOnInit(){
    this.vehicleList = null;
  }

  constructor(
    private http: HttpClient
  ) { }  

  async getVehicle(id: String){
    return this.http.get<Vehicle>(`${this.vehiclesUrl}/${id}`).toPromise();
  }

  async getUserVehicles(id: number){
    return this.http.get<Vehicle[]>(`${this.vehiclesUrl}/?user_id=${id}`).toPromise();
  }

  createVehicle(v: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.vehiclesUrl, v, this.httpOptions);
  }

  updateVehicle (v: Vehicle): Observable<any> {
    return this.http.put(this.vehiclesUrl, v, this.httpOptions);
  }
}
