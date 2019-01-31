import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService, usersListResponse } from '../services/users.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: usersListResponse[];
  usersSubscription: Subscription;
  
  constructor(private usersService: UsersService) { }

  ngOnInit() {

    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: usersListResponse[]) => {
        this.users = users? users: [];
      }
    );
    this.usersService.getUsers();

    // emettre le subject pour la premiere fois
    this.usersService.emitUsers();
  }
  
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }


}
