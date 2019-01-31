import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardResponse } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  article_count: Number = 5;
  user_count: Number = 6;
  comment_count: Number = 7;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
      
    this.dashboardService.countDashboard().subscribe(
      (data: DashboardResponse) => {
        this.article_count = data.article_count
        this.user_count = data.user_count
        this.comment_count = data.comment_count
      },
      (error) => {
        console.log('erreur dans dashboard component');
        console.log(error/*['error']['message']*/);        
      }
    );
  }

}
