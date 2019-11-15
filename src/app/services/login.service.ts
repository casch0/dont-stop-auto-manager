import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: boolean;

  ngOnInit(){
    this.currentUser = false;
  }

  constructor(
    private router: Router,
  ) { }

  login(){
    this.router.navigate(['profile']);
  }

  checkOnline(){
    if(!this.currentUser){
      this.router.navigate(['login']);
    }
  }
}
