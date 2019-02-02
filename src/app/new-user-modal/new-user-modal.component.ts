import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { usersListResponse } from '../models/User.model';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css']
})
export class NewUserModalComponent implements OnInit {
  // ce 'id_avirerPlusTard' je le recupere depuis la fenetre parent
  // UserListComponent ('user-list.component.ts',)
  // je le laisse momentannement pour suivre la logique dans les prochains modal.
  // qui auront besoin d'un input. Ici, Faudra le virer plus tard.
  @Input() id_avirerPlusTard: Number;
  @Input() userToUpdate: usersListResponse;

  newUserForm: FormGroup;
  errorMessage: string;
  headerModalTitle: string;
  buttonCaption: string;

  constructor(public activeModal: NgbActiveModal,
    private usersService: UsersService) { }

  ngOnInit() {
    feather.replace();
    this.initNewUserForm();
    this.headerModalTitle = this.userToUpdate ? "Update user" : "New user";
    this.buttonCaption = this.userToUpdate ? "Update" : "Create";
  }

  private initNewUserForm() {
    this.newUserForm = new FormGroup({
      'email': new FormControl({ value: this.userToUpdate ? this.userToUpdate.user_email : '', disabled: this.userToUpdate ? true : false }, [Validators.required, Validators.email]),
      'password': new FormControl({ value: this.userToUpdate ? '*' : '', disabled: this.userToUpdate ? true : false }, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]),
      'firstName': new FormControl(this.userToUpdate ? this.userToUpdate.user_first_name : '', [Validators.required]),
      'familyName': new FormControl(this.userToUpdate ? this.userToUpdate.user_family_name : '', [Validators.required]),
      'role': new FormControl(this.userToUpdate ? this.userToUpdate.user_role : 'admin', [Validators.required])
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  private submitNewUserForm() {
    if (this.newUserForm.valid) {

      if (!this.userToUpdate) {
        this.usersService.newUser(this.newUserForm.value).subscribe(
          (newUser: usersListResponse) => {
            this.usersService.pushIntoUsers(newUser);
            this.usersService.emitUsers();
            // kmg important: si on veut travailler avec les données dans la fenetre mere,
            // on envoie en argument "this.newUserForm.value"
            this.activeModal.close(/*this.newUserForm.value*/);
          },
          (error) => {
            this.errorMessage = error['error']['message'];
          });
      }
      else {
        const userIndexToUpdate = this.usersService.getIndexInUsers(this.userToUpdate);        
        if (~userIndexToUpdate) {
          this.usersService.updateUser(this.userToUpdate, this.newUserForm.value).subscribe(
            (newUser: usersListResponse) => {
              this.usersService.updateOfUsers(userIndexToUpdate, this.userToUpdate, newUser);
              this.activeModal.close();
            },
            (error) => {
              this.errorMessage = error['error']['message'];
            });
        }
      }
    }
  }

  emailFocus() {
    this.errorMessage = "";
  }

}
