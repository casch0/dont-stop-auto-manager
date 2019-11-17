import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicleList: Vehicle[]; //users vehicles
  vehiclesUrl = 'api/vehicles';

  ngOnInit(){
    this.vehicleList = null;
  }

  constructor(
    private http: HttpClient
  ) { }  

  async getVehicle(id: String){
    return this.http.get<Vehicle>(`${this.vehiclesUrl}/${id}`).toPromise();
  }


  // async getUserVehicles(id: number){
  //   return this.http.get<Vehicle>(`${this.vehiclesUrl}/${id}`).toPromise;
  // }
}
