import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export interface usersListResponse {
  user_role: string;
  _id: string;
  user_first_name: string;
  user_family_name: string;
  user_email: string;
  user_virtual_full_name: string;
  user_virtual_url: string;
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: usersListResponse[] = [];
  // usersSubject est un subject qui émettra cet array users
  usersSubject = new Subject<usersListResponse[]>();

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    public router: Router,
    private authService: AuthService) { }
  // cette méthode prendra le contenu de users et l'émettra à travers le subject
  emitUsers() {
    this.usersSubject.next(this.users);
  }

  getUsers() {
    return this.http.get<usersListResponse[]>(`${environment.uri}/admin/users`).subscribe(
      (data: usersListResponse[]) => {
        this.users = data;
        this.emitUsers();
      },
      (error) => {
        console.log('erreur dans users-service lors de la récupération des users');
        console.log(error/*['error']['message']*/);
      });
  }

  newUser(user: User) {
    return this.http.post<usersListResponse>(`${environment.uri}/admin/user/create`, user)
  }

  pushUser(newUser: usersListResponse) {
    this.users.push(newUser);
  }

  removeUser(userToRemove: usersListResponse) {
    const userIndexToRemove = this.users.findIndex(
      (userEl) => {
        if (userEl === userToRemove) {
          return true;
        }
      }
    );

    if (~userIndexToRemove) {
      return this.http.post(`${environment.uri}/admin/user/${userToRemove.id}/delete`, {}).subscribe(
        (data) => {
          const token: string = this.cookieService.get('authToken');
          const tokenPayload = decode(token);

          if ( tokenPayload.id !== userToRemove.id) {
            this.users.splice(userIndexToRemove, 1);
            this.emitUsers();
          }
          else {
            // si l'utilisateur s'est auto supprimé, on retourne à la page de login
            this.authService.signOut();
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.log('erreur dans users-service lors du delete de l\'user ayant l\'email: ' + userToRemove.user_email);
          console.log(error/*['error']['message']*/);
        }
      )
    }
  }
}
