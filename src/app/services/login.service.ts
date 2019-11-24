import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { ServiceItem } from '../models/serviceItem';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: User;
  usersUrl = 'http://localhost:8080/user';
  profileURL: String;

  httpOptions = {
    headers:
      new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '1' })
  };



  ngOnInit() {
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  async login(email: String, pass: String) {
    const url = this.usersUrl + '/login';

    this.http.post(url, {
      'email': email,
      'password': pass
    }, { responseType: 'text' }).subscribe(
      token => localStorage.setItem('token', token),
      () => window.alert("Invalid Credentials"),
    );

    const checkJWT =
      setInterval(() => {
        let jwt = localStorage.getItem('token');
        if (jwt) {
          console.log(jwt);
          this.httpOptions.headers = this.httpOptions.headers.set('Authorization', jwt);
          console.log(this.httpOptions.headers.get('Authorization'))
          this.http.get<User>(`${this.usersUrl}/user`, this.httpOptions).subscribe(
            user => this.currentUser = user,
            err => console.log(err),
            () => console.log(this.currentUser));
          clearInterval(checkJWT);
        }
      }, 100);

    const checkUser =
      setInterval(() => {
        if (this.currentUser) {
          this.profileURL = '/profile/' + this.currentUser.id;
          this.router.navigate([this.profileURL]);
          clearInterval(checkUser);
        }
      }, 100);

    setTimeout(() => {
      clearInterval(checkJWT);
      clearInterval(checkUser);
      console.log('login timeout');
    }, 2000);
  }

  checkOnline() {
    console.log('is user online? ...');
    if (!localStorage.getItem('token') || localStorage.getItem('token') == '1') { //not logged in wiht JWT
      console.log('NOT ONLINE');
      this.router.navigate(['login']);
    } else {                            //Logged in
      let jwt = localStorage.getItem('token');

      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', jwt);
      console.log(jwt);
      this.http.get<User>(`${this.usersUrl}/user`, this.httpOptions).subscribe(
        user => this.currentUser = user,
        err => console.log(err),
        () => {
          console.log(this.currentUser);
          this.profileURL = '/profile/' + this.currentUser.id;
          if (this.router.url.match('login'))
            this.router.navigate([this.profileURL]);
        });
      console.log(this.currentUser);
    }
  }

  checkUserType(user: User) {
    if (user.roleId == 2) {
      this.router.navigate(['/technician/' + user.id]);
    }
  }

  getUser(id: String) {
    return this.http.get<User>(`${this.usersUrl}/${id}`, this.httpOptions);
  }

  getUserVehicles(id: String) {
    return this.http.get<Vehicle[]>(`${this.usersUrl}/${id}/vehicles`, this.httpOptions);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions);
  }

  getServices(id: String) {
    return this.http.get<ServiceItem[]>(`${this.usersUrl}/${id}/servicereports`, this.httpOptions);
  }

  getTechServices(id: String) {
    return this.http.get<ServiceItem[]>(`${this.usersUrl}/${id}/technicianreports`, this.httpOptions);
  }

  searchTechnicians(u: User){
    return this.http.post<User[]>(`${this.usersUrl}/technicians/`, u, this.httpOptions);
  }

}
