import { articlesUserResponse } from './Article.model';
import { userDetailsArticleResponse } from './User.model';

export interface commentsListResponse {
  _id: string,
  comment_content: string,
  comment_date: Date,
  comment_virtual_url: string,
  id: string,
  comment_article: userDetailsArticleResponse
  comment_user:  articlesUserResponse
}