import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { commentsListResponse } from '../models/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: commentsListResponse[] = [];
  // commentsSubject est un subject qui émettra cet array comments
  commentsSubject = new Subject<commentsListResponse[]>();

  constructor(
    private http: HttpClient
  ) { }

  // cette méthode prendra le contenu des commentaires et l'émettra à travers le subject
  emitComments() {
    this.commentsSubject.next(this.comments);
  }

  setComments(comments: commentsListResponse[]) {
    this.comments = comments;
  }

  getComments() {
    return this.http.get<commentsListResponse[]>(`${environment.uri}/admin/comments`)
  }

  removeComment(commentToRemove: commentsListResponse) {
    return this.http.post(`${environment.uri}/admin/comment/${commentToRemove.id}/delete`, {})
  }

  getIndexInComments(comment: commentsListResponse) {
    return this.comments.findIndex(
      (commentEl) => {
        if (commentEl === comment) {
          return true;
        }
      }
    );
  }

  removeFromComments(index: number) {
      this.comments.splice(index, 1);
      this.emitComments();    
  }
}
