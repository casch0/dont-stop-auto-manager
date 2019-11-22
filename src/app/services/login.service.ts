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
  jwt: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.currentUser = null;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  async login(email: String, pass: String) {
    this.loginUser(email, pass); //assign JWT

    const checkJWT =
      setInterval(() => {
        if (!(this.jwt == '' || this.jwt == undefined || this.jwt == null)) {
          console.log(this.jwt);
          this.httpOptions.headers = this.httpOptions.headers.append('Authorization', this.jwt);
          this.http.get<User>(`${this.usersUrl}/user`, this.httpOptions).subscribe(
            user => this.currentUser = user,
            err => console.log(err),
            () => console.log(this.currentUser));
          localStorage.setItem('token', this.jwt);
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
    }, 2000);
  }

  checkOnline() {
    if (!localStorage.getItem('token')) { //not logged in wiht JWT
      this.router.navigate(['login']);
    } else {                            //Logged in
      if (!this.httpOptions.headers.get('Authorization')) {
        this.httpOptions.headers = this.httpOptions.headers.append('Authorization', localStorage.getItem('token'));
      }

      this.http.get<User>(`${this.usersUrl}/user`, this.httpOptions).subscribe(
        user => {
          this.currentUser = user;
          this.profileURL = '/profile/' + this.currentUser.id;
          if (this.router.url.match("login"))
            this.router.navigate([this.profileURL]);
        },
        err => this.router.navigate(["login"]),
        () => console.log(this.currentUser)); 
    }
  }

  checkUserType() {
    if (this.currentUser.roleId == 2) {
      this.router.navigate(['/technician/' + this.currentUser.id]);
    }
  }

  async getUser(id: String) {
    return this.http.get<User>(`${this.usersUrl}/${id}`, this.httpOptions).toPromise();
  }

  async getUserVehicles(id: number) {
    return this.http.get<Vehicle[]>(`${this.usersUrl}/${id}/vehicles`, this.httpOptions).toPromise();
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions);
  }

  async loginUser(email: String, password: String) {
    const url = this.usersUrl + '/login';
    this.jwt = await this.http.post(url, {
      email,
      password
    }, { responseType: 'text' })
      .toPromise();
  }

  async getServices(id: number) {
    return this.http.get<ServiceItem[]>(`${this.usersUrl}/${id}/servicereports`, this.httpOptions).toPromise();
  }
  
  async getTechServices(id: number) {
    return this.http.get<ServiceItem[]>(`${this.usersUrl}/${id}/technicianreports`, this.httpOptions).toPromise();
  }
  
}
