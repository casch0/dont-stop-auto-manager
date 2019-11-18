import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ServiceItem } from 'src/app/models/serviceItem';
import { Vehicle } from 'src/app/models/vehicle';
import { ServiceItemService } from 'src/app/services/service-item.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicle: Vehicle;
  vehicleID: String;
  serviceItems: ServiceItem[];

  pastServices = <ServiceItem[]>[];
  futureServices = <ServiceItem[]>[];


  constructor(
    private loginService: LoginService,
    private router: Router,
    private vehicleService: VehicleService,
    private SIS: ServiceItemService
  ) { }

  async ngOnInit() {
    this.loginService.checkOnline();
    this.vehicleID = this.router.url.match(/\d+$/)[0];
    this.vehicle = <Vehicle>await this.vehicleService.getVehicle(this.vehicleID);
    this.serviceItems = <ServiceItem[]>await this.SIS.getVehicleServices(this.vehicleID);
    this.populateServiceList();    
  }

  populateServiceList(){
    let now = new Date().getTime();
    for(let s of this.serviceItems){
      let sTime = new Date(s.date).getTime();
      if (sTime <= now){
        this.pastServices.push(s);
      } else {
        this.futureServices.push(s);
      }
    }
  }
}
