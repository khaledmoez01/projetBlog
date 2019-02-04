import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { articlesListResponse, articleSingleResponse } from '../models/Article.model';
import { commentsListResponse } from '../models/Comment.model';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: articlesListResponse[] = [];
  // articlesSubject est un subject qui émettra cet array articles
  articlesSubject = new Subject<articlesListResponse[]>();


  private articleComments: commentsListResponse[] = [];
  articleCommentsSubject = new Subject<commentsListResponse[]>();

  constructor(
    private http: HttpClient,
    private commentsService: CommentsService,
  ) { }

  // cette méthode prendra le contenu de articles et l'émettra à travers le subject
  emitArticles() {
    this.articlesSubject.next(this.articles);
  }

  emitArticleComments() {
    this.articleCommentsSubject.next(this.articleComments);
  }

  setArticles(articles: articlesListResponse[]) {
    this.articles = articles;
  }

  setArticleComments(comments: commentsListResponse[]) {
    this.articleComments = comments;
  }

  getArticles() {
    return this.http.get<articlesListResponse[]>(`${environment.uri}/admin/articles`)
  }

  removeArticle(articleToRemove: articlesListResponse) {
    return this.http.post(`${environment.uri}/admin/article/${articleToRemove.id}/delete`, {})
  }

  getSingleArticle(id_article: string) {
    return this.http.get<articleSingleResponse>(`${environment.uri}/admin/article/${id_article}`);
  }

  getImageArticle(imageName: string) {
    return this.http.get(`${environment.uri}/uploads/${imageName}`, {responseType: "blob"});
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

  getIndexInArticleComments(comment: commentsListResponse) {
    return this.articleComments.findIndex(
      (articleCommentEl) => {
        if (articleCommentEl === comment) {
          return true;
        }
      }
    );
  }

  removeFromArticles(index: number) {
      this.articles.splice(index, 1);
      this.emitArticles();    
  }

  removeFromArticleComments(index: number) {
      this.articleComments.splice(index, 1);
      this.emitArticleComments();    
  }  

  removeArticleComment(commentToRemove: commentsListResponse) { 
    return this.commentsService.removeComment(commentToRemove);
  }
}
