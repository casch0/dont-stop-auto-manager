import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: User;
  usersUrl = 'api/users';

  ngOnInit(){
    this.currentUser = null;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  async login(email: String, pass: String){
    //need to check DB for user
    this.currentUser = await this.getUser(email);
    console.log(this.currentUser);

    if (this.currentUser){
      const url = 'profile/' + email;
      console.log("this is the url: " + url);
      this.router.navigate([url]);
    }else{
      console.log('invalid user');
    }
  }

  checkOnline(){
    if(!this.currentUser){
      this.router.navigate(['login']);
    }
  }

  async getUser(id: String){
    return this.http.get<User>(`${this.usersUrl}/${id}`).toPromise();
  }

  // async loginUser(username: string, password: string) {
  //   return this.http.post<User>(`${this.usersUrl}`, { "username": `${username}`, "password": `${password}` }).toPromise();
  // }
}
