import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: User;
  usersUrl = 'api/users';
  profileURL: String;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  ngOnInit() {
    this.currentUser = null;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  async login(email: String, pass: String) {
    this.currentUser = <User>await this.getUser(email) //should be login(user, pass) when integrated
      .catch(() => window.alert('invalid user'));

    if (this.currentUser) {
      this.profileURL = '/profile/' + this.currentUser.id;
      this.router.navigate([this.profileURL]);
    }
  }

  checkOnline() {
    if (!this.currentUser) {
      this.router.navigate(['login']);
    }
  }

  checkUserType() {
    if (this.currentUser.role_id == 2) {
      this.router.navigate(['/technician/' + this.currentUser.id]);
    }
  }

  async getUser(id: String) {
    return this.http.get<User>(`${this.usersUrl}/${id}`).toPromise();
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  updateUser (user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions);
  }

  //TODO 
  // use for real login authentication server side
  //
  // async loginUser(username: string, password: string) {
  //   return this.http.post<User>(`${this.usersUrl}`, { "username": `${username}`, "password": `${password}` }).toPromise();
  // }

  
}
