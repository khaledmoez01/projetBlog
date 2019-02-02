export interface User {
  firstName: string,
  familyName: string,
  email: string,
  password: string,
  role: string,
  full_name: string,
  url: string,
  id: string
}

export interface usersListResponse {
  user_role: string;
  _id: string;
  user_first_name: string;
  user_family_name: string;
  user_email: string;
  user_virtual_full_name: string;
  user_virtual_url: string;
  id: string
}

export interface userDetailsArticleResponse {
  _id: string,
  article_title: string,
  article_content: string,
  article_virtual_content_introduction: string,
  article_virtual_url: string,
  id: string,
}

export interface userDetailsCommentResponse {
  _id: string,
  comment_content: string,
  comment_virtual_url: string,
  id: string,
}

export interface userSingleResponse {
  user : usersListResponse,
  user_articles : userDetailsArticleResponse[],
  user_comments : userDetailsCommentResponse[]
}