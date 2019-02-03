import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { articlesListResponse } from '../models/Article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: articlesListResponse[] = [];
  // articlesSubject est un subject qui émettra cet array articles
  articlesSubject = new Subject<articlesListResponse[]>();

  constructor(
    private http: HttpClient
  ) { }

  // cette méthode prendra le contenu de articles et l'émettra à travers le subject
  emitArticles() {
    this.articlesSubject.next(this.articles);
  }

  setArticles(articles: articlesListResponse[]) {
    this.articles = articles;
  }

  getArticles() {
    return this.http.get<articlesListResponse[]>(`${environment.uri}/admin/articles`)
  }

  removeArticle(articleToRemove: articlesListResponse) {
    return this.http.post(`${environment.uri}/admin/article/${articleToRemove.id}/delete`, {})
  }

  getIndexInArticles(article: articlesListResponse) {
    return this.articles.findIndex(
      (articleEl) => {
        if (articleEl === article) {
          return true;
        }
      }
    );
  }

  removeFromArticles(index: number) {
      this.articles.splice(index, 1);
      this.emitArticles();    
  }
}
