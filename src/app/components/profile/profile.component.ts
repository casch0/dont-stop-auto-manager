import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  profileID: String;
  vehicles: Vehicle[];
  

  constructor(
    private loginService: LoginService,
    private vehicleService: VehicleService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.loginService.checkOnline();
    this.profileID = this.router.url.match(/\d+$/)[0];
    this.user = <User>await this.loginService.getUser(this.profileID);
    this.getVehicles();
    setTimeout(() => {
      console.log(this.vehicles);
      
    }, 5000);
  }

  async getVehicles(){
    this.vehicles=<Vehicle[]>await this.vehicleService.getUserVehicles(this.user.id);
  }
}
