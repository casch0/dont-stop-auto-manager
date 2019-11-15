import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputEmail = '';
  inputPassword = '';

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }

  loginSuccess(){
    this.loginService.login();
    this.loginService.currentUser = true;
    console.log(this.loginService.currentUser);
  }
}
