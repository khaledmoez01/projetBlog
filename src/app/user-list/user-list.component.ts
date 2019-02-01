import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService, usersListResponse } from '../services/users.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: usersListResponse[];
  usersSubscription: Subscription;

  constructor(private usersService: UsersService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: usersListResponse[]) => {
        this.users = users ? users : [];
      }
    );
    this.usersService.getUsers();

    // emettre le subject pour la premiere fois
    this.usersService.emitUsers();
    feather.replace();
  }

  openNewUserFormModal() {
    const modalRef = this.modalService.open(NewUserModalComponent);

    // ce 'id_avirerPlusTard' sert juste d'exemple pour les prochains modals, il faudra le supprimer apres
    // ainsi que le supprimer dans NewUserModalComponent (new-user-modal-component.ts)
    // on va passer ce 'id_avirerPlusTard' au modal NewUserModalComponent (new-user-modal-component.ts)
    modalRef.componentInstance.id_avirerPlusTard = 10;

    /* **** kmg commentaire important **** */
    /* j'ai mis le code ci-dessous en commentaire car l'appel au service se fait directement dans la modal */
    /* je le laisse ici quand meme au cas ou j'en aurai besoin plus tard                                   */

    // // cette partie représente l'action ou l'utilisateur ferme la modale avec le bouton "vert"
    // // ici newUser represente "this.newUserForm.value" dans la fenetre modale NewUserModalComponent
    // modalRef.result.then((newUser) => {
    //   this.usersService.newUser(newUser);

    // }).catch((error) => {
    //   console.log('erreur03 dans user-list component ');
    //   console.log(error);
    // });

    /* **** fin kmg commentaire important **** */
  }

  onDeleteUser(user: usersListResponse) {
    this.usersService.removeUser(user);
  }

  onUpdateUserOpenModal(userToUpdate: usersListResponse) {
    const modalRef = this.modalService.open(NewUserModalComponent);
    modalRef.componentInstance.userToUpdate = userToUpdate;
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }


}
