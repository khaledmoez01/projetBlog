import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserLoginResponse } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)])
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      // const email = this.signInForm.get('email').value;
      
      this.authService.signInUser(this.signInForm.value).subscribe(
        (data: UserLoginResponse) => {
          this.cookieService.set( 'authToken', data.user.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = error['error']['message'];
        }
      );
    }
  }
}
