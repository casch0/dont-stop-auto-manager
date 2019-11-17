import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.currentUser = null;
  }

  gotoVehicle(id: number){
    this.router.navigate(['/vehicle/' + id]);
  }
}
