import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { SingleArticleComponent } from './article-list/single-article/single-article.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService  as AuthGuard  } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ArticleListComponent },
  { path: 'article/:id', component: SingleArticleComponent },
  {
    path: 'dashboard',
    component: HeaderAdminComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'admin'
    },
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'articles', component: ArticleListComponent },
      { path: 'comments', component: CommentListComponent },
      { path: '', component: DashboardComponent },
      { path: '**', redirectTo: '' }/*,
      { path: '', redirectTo: 'users', pathMatch: 'full' },*/
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
