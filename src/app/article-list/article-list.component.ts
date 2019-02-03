import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { articlesListResponse } from '../models/Article.model';
import { ArticlesService } from '../services/articles.service';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  articles: articlesListResponse[];
  articlesSubscription: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private router: Router) { }

  ngOnInit() {

    this.articlesSubscription = this.articlesService.articlesSubject.subscribe(
      (articles: articlesListResponse[]) => {
        this.articles = articles ? articles : [];
      }
    );
    this.articlesService.getArticles().subscribe(
      (data: articlesListResponse[]) => {
        this.articlesService.setArticles(data); 
        this.articlesService.emitArticles();
        console.log(data);
      },
      (error) => {
        console.log('erreur dans articles-service lors de la récupération des articles');
        console.log(error/*['error']['message']*/);
      }
    );
    feather.replace();
  }

  onEditArticle(article: articlesListResponse) {
    console.log("kmg not implemented yet ArticleListComponent.onEditArticle");
    console.log(article);
  }

  onDeleteArticle(article: articlesListResponse) {
    console.log("kmg not implemented yet ArticleListComponent.onDeleteArticle");
    console.log(article);
  }

  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
  }
}
