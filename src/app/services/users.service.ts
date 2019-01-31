import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

export interface usersListResponse {
  user_role              : string;
  _id                    : string;
  user_first_name        : string;
  user_family_name       : string;
  user_email             : string;
  user_virtual_full_name : string;
  user_virtual_url       : string;
  id                     : string
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: usersListResponse[] = [];
  // usersSubject est un subject qui émettra cet array users
  usersSubject = new Subject<usersListResponse[]>();

  constructor(private http: HttpClient) { }
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
        console.log('erreur dans user-list component');
        console.log(error/*['error']['message']*/);        
      });
  }
}
