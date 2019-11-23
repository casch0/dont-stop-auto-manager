import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;

  searchResults = <String[]>[];

  dummyNames= [
    'a',
    'ab',
    'b',
    'bc'
  ];

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }

  logout() {
    this.loginService.currentUser = null;
    this.loginService.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    localStorage.clear();
  }

  gotoVehicle(id: number){
    this.router.navigate(['/vehicle/' + id]);
  }
}
