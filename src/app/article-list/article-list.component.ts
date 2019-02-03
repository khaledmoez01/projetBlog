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
    const articleIndexToRemove = this.articlesService.getIndexInArticles(article);
    if (~articleIndexToRemove) {
      this.articlesService.removeArticle(article).subscribe(
        (data) => {          
          this.articlesService.removeFromArticles(articleIndexToRemove);
        },
        (error) => {
          console.log('erreur dans articles-service lors du delete de l\'article ayant le titre: ' + article.article_title);
          console.log(error/*['error']['message']*/);
        }
      );
    }
  }

  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
  }
}
