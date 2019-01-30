import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './services/auth.service';
import { ArticlesService } from './services/articles.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CommentsService } from './services/comments.service';
import { UsersService } from './services/users.service';

import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { SingleArticleComponent } from './article-list/single-article/single-article.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { HeaderSimpleUserComponent } from './header-simple-user/header-simple-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserListComponent,
    ArticleListComponent,
    SingleArticleComponent,
    CommentListComponent,
    HeaderAdminComponent,
    HeaderSimpleUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService     ,
    ArticlesService ,
    AuthGuardService,
    CommentsService ,
    UsersService    ,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
