import { User } from '@/api/user';

export interface Response {
  error: string;
  detail: any;
  message: string;
  data: any;
  status_code: number;
}

export interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface RequestLogin {
  account: string;
  password: string;
}

export interface ResponseLogin extends Response {
  account: string;
  token: Token;
}

export interface RequestRegister {
  account: string;
  password: string;
}

export interface ResponseRegister extends Response {
  user: User;
}
