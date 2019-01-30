import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // kmg pour la gestion des petites icones. j'ai suivi cette discussion: 'How to use svg icon set package from node_modules in angular4?'
    feather.replace();
  }

}
