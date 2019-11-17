import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  signup(){
    //signup submit in modal
  }

  forgotPassword(){
    //fpass in modal
  }

  onSubmit(){
    this.loginService.login(this.loginForm.value['email'], this.loginForm.value['password']);
  }
}
