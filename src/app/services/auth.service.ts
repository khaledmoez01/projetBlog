import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { environment } from '../../environments/environment';

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
  
  constructor(private http: HttpClient) { }

  signInUser(user: User) {
    return this.http.post<UserLoginResponse>(`${environment.uri}/login`, user);
  }

  signUpUser(user: User) {
    return this.http.post(`${environment.uri}/signup`, user);
  }
}
