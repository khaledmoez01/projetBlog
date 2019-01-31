import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

export interface UserLoginResponse {
  user: {
    _id: string,
    email: string,
    token: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  
  constructor(private http: HttpClient,
    private cookieService: CookieService
    ) { }

  signInUser(user: User) {
    return this.http.post<UserLoginResponse>(`${environment.uri}/login`, user);
  }

  signUpUser(user: User) {
    return this.http.post(`${environment.uri}/signup`, user);
  }

  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    // Check whether the token is expired
    return !helper.isTokenExpired(this.getToken());
  }

  public getToken(): string {
    return this.cookieService.get('authToken');
  }

  signOut() {
    this.cookieService.delete('authToken'); 
  }

}
