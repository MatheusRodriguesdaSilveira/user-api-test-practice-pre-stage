export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserRequest {
  user_id: string;
  name: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}
