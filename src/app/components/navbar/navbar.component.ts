import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.currentUser = null;
  }

  gotoVehicle(id: number){
    console.log("Test if sending vehicle url")
    this.router.navigate(['/vehicle/' + id]);
  }
}
