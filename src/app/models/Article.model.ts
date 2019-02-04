import { commentsListResponse } from './Comment.model';

export interface articlesUserResponse {
  _id: string,
  user_first_name: string,
  user_family_name: string,
  user_virtual_full_name: string,
  user_virtual_url: string,
  id: string
}

export interface articlesListResponse {
  _id: string,
  article_title: string,
  article_content: string,
  article_date: Date,
  article_virtual_content_introduction: string,
  article_virtual_url: string,
  id: string,
  article_user: articlesUserResponse
}

export interface articleDetailsResponse {
  _id: string,
  article_title: string,
  article_content: string,
  article_date: Date,
  article_virtual_content_introduction: string,
  article_virtual_url: string,
  id: string,
  article_user: articlesUserResponse,
  article_image: string
}

export interface articleSingleResponse {
  article : articleDetailsResponse,
  article_comments : commentsListResponse[]
}