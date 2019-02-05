import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { articleSingleResponse, articlesUserResponse } from '../../models/Article.model';
import { commentsListResponse } from '../../models/Comment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit, OnDestroy {
  articleDetails: articleSingleResponse;

  imageToShow: any;
  isImageLoading: boolean = false;

  articleComments: commentsListResponse[];
  articleCommentsSubscription: Subscription;

  // ActivatedRoute permet de récupérer l'identifiant de l'url
  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  async ngOnInit() {

    this.articleCommentsSubscription = this.articlesService.articleCommentsSubject.subscribe(
      (articleComments: commentsListResponse[]) => {
        this.articleComments = articleComments ? articleComments : [];
      }
    );

    // this.route est de type ActivatedRoute qui permet de récupérer l'identifiant de l'url
    // snapshot est une classe des parametres de la route
    // params contient la liste des parametres
    const id_article = this.route.snapshot.params['id'];
    let articleDetailsResponse: articleSingleResponse;

    try {
      articleDetailsResponse = await this.articlesService.getSingleArticle(id_article).toPromise();
    } catch (error) {
      console.log('erreur dans single article component dans ngOnInit lors de l\'appel à getSingleArticle()');
      console.log(error/*['error']['message']*/);
    }

    if (articleDetailsResponse) {
      this.articleDetails = articleDetailsResponse;
      this.isImageLoading = true;

      this.articlesService.setArticleComments(this.articleDetails.article_comments);
      this.articlesService.emitArticleComments();

      if (this.articleDetails.article.article_image.length > 0) {
        // voir la reponse de 'Gregor Doroschenko' dans la discussion 
        // sur stackoverflow 'Getting Image from API in Angular 4/5+?'
        this.articlesService
        .getImageArticle(this.articleDetails.article.article_image.replace(/uploads\\/, ''))
        .subscribe(
          (data) => {
            this.createImageFromBlob(data);
            this.isImageLoading = false;
          },
          (error) => {
            this.isImageLoading = false;
            console.log('erreur dans single user component dans getImageArticle()');
            console.log(error/*['error']['message']*/);
          },
          () => {
            // ici les ancres ne peuvent pas etre implémentés 'normalement', je suis obligé de forcer le truc
            // car les id des commentaires sont chargés aprés l'appel à http. ils ne sont donc pas statiques.
            // on a implémenté la réponse de 'Alberto L. Bonfiglio' dans stackoverflow
            // 'How to call scrollIntoView on an element in angular 2+' 
            const tree = this.router.parseUrl(this.router.url);
            if (tree.fragment) {
              let element = document.getElementById(tree.fragment);
              if (element) {
                setTimeout(() => {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                }, 500);
              }
            }
          }
        );
      }
    }
  }

  onBack() {
    this.router.navigate(['/dashboard', 'articles']);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onUpdateArticleComment(comment: commentsListResponse) {
    console.log("kmg not implemented yet SingleArticleComponent.onUpdateComment");
    console.log(comment);
  }

  onDeleteArticleComment(comment: commentsListResponse) {
    const commentIndexToRemove = this.articlesService.getIndexInArticleComments(comment);
    if (~commentIndexToRemove) {
      this.articlesService.removeArticleComment(comment).subscribe(
        (data) => {
          this.articlesService.removeFromArticleComments(commentIndexToRemove);
        },
        (error) => {
          console.log('erreur dans SingleArticleComponent lors du delete du commentaire ayant le contenu: ' + comment.comment_content + ' - et rédigé par ' + comment.comment_user.user_virtual_full_name + ' - le ' + comment.comment_date);
          console.log(error/*['error']['message']*/);
        }
      );
    }
  }

  onEditUser(user: articlesUserResponse) {
    this.router.navigate(['/dashboard', 'user', user.id]);
  }

  ngOnDestroy() {
    this.articleCommentsSubscription.unsubscribe();
  }

}
