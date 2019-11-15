import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }

  logout(){
    console.log("before: " + this.loginService.currentUser);
    this.loginService.currentUser = false;
  }
}
