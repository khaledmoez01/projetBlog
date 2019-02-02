import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { User, usersListResponse, userSingleResponse } from '../models/User.model';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: usersListResponse[] = [];
  // usersSubject est un subject qui émettra cet array users
  usersSubject = new Subject<usersListResponse[]>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public router: Router,
    private authService: AuthService
  ) { }

  // cette méthode prendra le contenu de users et l'émettra à travers le subject
  emitUsers() {
    this.usersSubject.next(this.users);
  }

  setUsers(users: usersListResponse[]) {
    this.users = users;
  }

  getUsers() {
    return this.http.get<usersListResponse[]>(`${environment.uri}/admin/users`)
  }

  getSingleUser(id_user: string) {
    return this.http.get<userSingleResponse>(`${environment.uri}/admin/user/${id_user}`);
  }

  newUser(user: User) {
    return this.http.post<usersListResponse>(`${environment.uri}/admin/user/create`, user)
  }

  updateUser(userToUpdate: usersListResponse, dataOfUser: User) {
    return this.http.post<usersListResponse>(`${environment.uri}/admin/user/${userToUpdate.id}/update`, dataOfUser)
  }

  removeUser(userToRemove: usersListResponse) {
    return this.http.post(`${environment.uri}/admin/user/${userToRemove.id}/delete`, {})
  }

  getIndexInUsers(user: usersListResponse) {
    return this.users.findIndex(
      (userEl) => {
        if (userEl === user) {
          return true;
        }
      }
    );
  }

  pushIntoUsers(newUser: usersListResponse) {
    this.users.push(newUser);    
    this.emitUsers();
  }

  updateOfUsers(index: number, userToUpdate: usersListResponse, newUser: usersListResponse) {

    const token: string = this.cookieService.get('authToken');
    const tokenPayload = decode(token);

    if (tokenPayload.id !== userToUpdate.id || newUser.user_role === 'admin') {
      this.users[index] = newUser
      this.emitUsers();
    }
    else {
      // si l'utilisateur admin s'est auto transformé en simpleuser, on retourne à la page de login
      this.authService.signOut();
      this.router.navigate(['/login']);
    }
  }

  removeFromUsers(index: number, user: usersListResponse) {
    const token: string = this.cookieService.get('authToken');
    const tokenPayload = decode(token);

    if (tokenPayload.id !== user.id) {
      this.users.splice(index, 1);
      this.emitUsers();
    }
    else {
      // si l'utilisateur s'est auto supprimé, on retourne à la page de login
      this.authService.signOut();
      this.router.navigate(['/login']);
    }
  }
}
