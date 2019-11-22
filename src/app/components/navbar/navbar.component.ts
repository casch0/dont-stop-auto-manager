import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private loginService: LoginService, 
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.currentUser = null;
    this.loginService.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  gotoVehicle(id: number){
    this.router.navigate(['/vehicle/' + id]);
  }
}
