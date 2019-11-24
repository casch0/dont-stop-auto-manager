import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchParameters: String;

  searchResults = <User[]>[];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.currentUser = null;
    this.loginService.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    localStorage.clear();
  }

  gotoVehicle(id: number) {
    this.router.navigate(['/vehicle/' + id]);
  }

  search(s: String) {
    let user = new User();
    user.firstName = <String>s.split(' ')[0];
    user.lastName = <String>s.split(' ')[1];
    console.log(user);
    this.loginService.searchTechnicians(user).subscribe(
      list => this.searchResults = list);

    let checklist =
      setInterval(()=>{
        if(this.searchResults.length != 0){
          this.router.navigate(['profile/' + this.searchResults[0].id]);
          clearInterval(checklist);
        }
      } ,100);

    setTimeout(()=>{
      console.log('search timeout');
      clearInterval(checklist);
    },2000);
  }
}
