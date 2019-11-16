import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  currentVehicle: Vehicle;
  vehicleList: Vehicle[];
  vehiclesUrl = 'api/vehicles';

  ngOnInit(){
    this.currentVehicle = null;
  }

  constructor(
    private http: HttpClient
  ) { }  

  async getVehicle(id: number){
    return this.http.get<Vehicle>(`${this.vehiclesUrl}/${id}`).toPromise();
  }

  async setCurrentVehicle(id: number){
    this.currentVehicle = await this.getVehicle(id);
    console.log(this.currentVehicle);
  }

  // async getUserVehicles(id: number){
  //   return this.http.get<Vehicle>(`${this.vehiclesUrl}/${id}`).toPromise;
  // }
}
