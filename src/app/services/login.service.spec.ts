import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('LoginService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({ providers: [LoginService, Router, HttpClient]})
  );

  // it('should be created', () => {
  //   const service: LoginService = TestBed.get(LoginService);
  //   expect(service).toBeTruthy();
  // });
});
