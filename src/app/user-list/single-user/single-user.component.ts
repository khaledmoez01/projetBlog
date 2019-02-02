import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { userSingleResponse } from '../../models/User.model';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  userDetails: userSingleResponse

  // ActivatedRoute permet de récupérer l'identifiant de l'url
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.route est de type ActivatedRoute qui permet de récupérer l'identifiant de l'url
    // snapshot est une classe des parametres de la route
    // params contient la liste des parametres
    const id_user = this.route.snapshot.params['id'];

    this.userService.getSingleUser(id_user).subscribe(
      (userDetailsResponse: userSingleResponse) => {
        console.log(userDetailsResponse);
        this.userDetails = userDetailsResponse;
      },
      (error) => {
        console.log('erreur dans single user component dans ngOnInit');
        console.log(error/*['error']['message']*/);
      }
    );
  }

}
