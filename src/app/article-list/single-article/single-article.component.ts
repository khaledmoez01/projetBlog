import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { articleSingleResponse, articlesUserResponse } from '../../models/Article.model';
import { commentsListResponse } from '../../models/Comment.model';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {
  articleDetails: articleSingleResponse;
  imageToShow: any;
  isImageLoading: boolean = false;

  // ActivatedRoute permet de récupérer l'identifiant de l'url
  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  async ngOnInit() {
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
          }
        );

    }
  }

  onBack() {
    this.router.navigate(['/dashboard','articles']);
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

  onUpdateComment(comment: commentsListResponse) {
    console.log("kmg not implemented yet SingleArticleComponent.onUpdateComment");
    console.log(comment);
  }

  onDeleteComment(comment: commentsListResponse) {
    console.log("kmg not implemented yet SingleArticleComponent.onDeleteComment");
    console.log(comment);
  }

  onEditUser(user: articlesUserResponse) {
    this.router.navigate(['/dashboard','user', user.id]);
  }



}
