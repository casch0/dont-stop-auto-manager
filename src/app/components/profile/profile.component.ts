import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ServiceItemService } from 'src/app/services/service-item.service';
import { ServiceItem } from 'src/app/models/serviceItem';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  profileID: String;
  vehicles: Vehicle[];
  serviceItems: ServiceItem[];

  pastServices = <ServiceItem[]>[];
  futureServices = <ServiceItem[]>[];
  

  constructor(
    private loginService: LoginService,
    private vehicleService: VehicleService,
    private SIS : ServiceItemService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.loginService.checkOnline();
    this.profileID = this.router.url.match(/\d+$/)[0];
    this.user = <User>await this.loginService.getUser(this.profileID);
    this.vehicles=<Vehicle[]>await this.vehicleService.getUserVehicles(this.user.id);
    this.serviceItems = <ServiceItem[]>await this.SIS.getVehicleServices('1');
    this.populateServiceList();
  }

  getVehicleURL(v: Vehicle){
    let s = '/vehicle/' + v.id;
    return s; 
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
