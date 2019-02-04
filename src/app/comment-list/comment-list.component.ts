import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { commentsListResponse } from '../models/Comment.model';
import { CommentsService } from '../services/comments.service';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {
  comments: commentsListResponse[];
  commentsSubscription: Subscription;

  constructor(
    private commentsService: CommentsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.commentsSubscription = this.commentsService.commentsSubject.subscribe(
      (comments: commentsListResponse[]) => {
        this.comments = comments ? comments : [];
      }
    );
    this.commentsService.getComments().subscribe(
      (data: commentsListResponse[]) => {
        this.commentsService.setComments(data); 
        this.commentsService.emitComments();
        console.log(this.comments)
      },
      (error) => {
        console.log('erreur dans comments-service lors de la récupération des commentaires');
        console.log(error/*['error']['message']*/);
      }
    );
    feather.replace();
  }


  onEditComment(comment: commentsListResponse) {
    console.log("kmg not implemented yet CommentListComponent.onEditComment");
    console.log(comment);
  }


  onDeleteComment(comment: commentsListResponse) {
    const commentIndexToRemove = this.commentsService.getIndexInComments(comment);
    if (~commentIndexToRemove) {
      this.commentsService.removeComment(comment).subscribe(
        (data) => {          
          this.commentsService.removeFromComments(commentIndexToRemove);
        },
        (error) => {
          console.log('erreur dans comments-service lors du delete du commentaire ayant le contenu: ' + comment.comment_content + ' - et rédigé par ' + comment.comment_user.user_virtual_full_name + ' - le ' + comment.comment_date);
          console.log(error/*['error']['message']*/);
        }
      );
    }
  }

  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
  }
}
