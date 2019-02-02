import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = new FormGroup({
      'email'     : new FormControl('', [Validators.required, Validators.email]),
      'password'  : new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]),
      'firstName' : new FormControl('', [Validators.required]),
      'familyName': new FormControl('', [Validators.required]),
      'role'      : new FormControl('', [Validators.required])
    });
  }
  
  private get email() { return this.signupForm.get('email'); }  
  private get password() { return this.signupForm.get('password'); }
  private get firstName() { return this.signupForm.get('firstName'); }  
  private get familyName() { return this.signupForm.get('familyName'); }
  private get role() { return this.signupForm.get('role'); }  

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signUpUser(this.signupForm.value).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = error['error']['message'];
        }
      );
    }
  }

}
