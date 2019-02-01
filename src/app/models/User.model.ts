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