import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private cookieService: CookieService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // si, pour une raison ou une autre, le cookie n'existe pas; on revient à la page de login
    if (!this.cookieService.check('authToken')) {
      this.router.navigate(['/login']);
    }
    else {
      // kmg pour la gestion des petites icones. j'ai suivi cette discussion: 'How to use svg icon set package from node_modules in angular4?'
      feather.replace();
    }
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
