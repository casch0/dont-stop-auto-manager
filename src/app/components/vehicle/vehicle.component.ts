import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Service } from 'src/app/models/service';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicle: Vehicle;
  serviceItems: Service[];


  constructor(
    private loginService: LoginService,
    private router: Router,
    private vehicleService: VehicleService,
  ) { }

  ngOnInit() {
    this.loginService.checkOnline();
    this.loadVehicle();
  }

  loadVehicle(){
    this.vehicle = this.vehicleService.currentVehicle;
  }


}
