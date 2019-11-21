import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });

    this.signupForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  }

  signup(){
    let usr = new User();
    usr.firstName = this.signupForm.value['firstName'];
    usr.lastName = this.signupForm.value['lastName'];
    usr.email = this.signupForm.value['email'];
    usr.password = this.signupForm.value['password'];
    usr.pictureURL = '/assets/profile-default.png';
    
    this.loginService.addUser(usr).subscribe(
      () => console.log(usr)
    );
  }

  forgotPassword(){
    //fpass in modal
  }

  onSubmit(){
    this.loginService.login(this.loginForm.value['email'], this.loginForm.value['password']);
  }
}
