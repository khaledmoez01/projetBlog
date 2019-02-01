import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import { UsersService, usersListResponse } from '../services/users.service';
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

  newUserForm: FormGroup;
  errorMessage: string;

  constructor(public activeModal: NgbActiveModal,
    private usersService: UsersService) {}

  ngOnInit() {
    feather.replace();
    this.initNewUserForm();
    console.log("*****this.id_avirerPlusTard ****")
    console.log(this.id_avirerPlusTard)
  }
  
  private initNewUserForm() {
    this.newUserForm = new FormGroup({
      'email'     : new FormControl('', [Validators.required, Validators.email]),
      'password'  : new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]),
      'firstName' : new FormControl('', [Validators.required]),
      'familyName': new FormControl('', [Validators.required]),
      'role'      : new FormControl('', [Validators.required])
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  private submitNewUserForm() {
    if (this.newUserForm.valid) {
      // console.log("*****this.errorMessage ****")
      // console.log(this.errorMessage);

      this.usersService.newUser(this.newUserForm.value).subscribe(
        (newUser: usersListResponse) => {
          this.usersService.pushUser(newUser);
          this.usersService.emitUsers();
          // kmg important: si on veut travailler avec les données dans la fenetre mere,
          // on envoie en argument "this.newUserForm.value"
          this.activeModal.close(/*this.newUserForm.value*/);
        },
        (error) => {
          this.errorMessage = error['error']['message'];      
        });;
    }
  }
  emailFocus() {
    this.errorMessage = "";
  }

}
