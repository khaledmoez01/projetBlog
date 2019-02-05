import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticlesService } from '../../services/articles.service';
import * as feather from 'feather-icons';
import { articlesListResponse } from '../../models/Article.model';

@Component({
  selector: 'app-new-article-modal',
  templateUrl: './new-article-modal.component.html',
  styleUrls: ['./new-article-modal.component.css']
})
export class NewArticleModalComponent implements OnInit {

  newArticleForm: FormGroup;
  errorMessage: string;
  headerModalTitle: string;
  buttonCaption: string;
  fileToUpload: File

  constructor(
    public activeModal: NgbActiveModal,
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
    feather.replace();
    this.initNewArticleForm();
    this.headerModalTitle = "New article";
    this.buttonCaption = "Create article";
  }

  initNewArticleForm() {
    this.newArticleForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'content': new FormControl('', [Validators.required])
    })

  }

  submitNewArticleForm() {
    
    let formData = new FormData();
    formData.append('title', this.newArticleForm.get('title').value);
    formData.append('content', this.newArticleForm.get('content').value);
    if (this.fileToUpload)
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    
    this.articlesService.newArticle(formData).subscribe(
      (newArticle: articlesListResponse) => {
        this.articlesService.pushIntoArticles(newArticle);

        console.log('*** NewArticleModalComponent.submitNewArticleForm(): newArticle ****')
        console.log(newArticle)

        this.activeModal.close();
      },
      (error) => {
        this.errorMessage = error['error']['message'];
      }
    );

    console.log(formData)
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  detectFiles(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  
}
