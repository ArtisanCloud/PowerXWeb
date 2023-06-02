import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { PowerModel, PrefixUriWeb } from '@/api/index';
import encodePassword from '@/utils/security';

const UriWebCustomer = '/customer';

export interface CustomerExternalId {
  openIdInMiniProgram?: string;
  openIdInWeChatOfficialAccount?: string;
  openIdInWeCom?: string;
}

export interface Customer extends PowerModel, CustomerExternalId {
  name: string;
  mobile: string;
  email: string;
  inviterId: number;
  source: number;
  type: number;
  isActivated: boolean;
  inviter?: Customer;
}

export type User = Customer;

export interface LoginData {
  account: string;
  password: string;
}

export interface Token {
  tokenType?: string;
  expiresIn?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginRes {
  openId?: string;
  unionId?: string;
  phoneNumber?: string;
  nickName?: string;
  avatarURL?: string;
  gender?: string;
  token: Token;
}

export async function login(data: LoginData) {
  const encodedPassword = await encodePassword(data.password);
  return axios.post<LoginRes>(`${PrefixUriWeb + UriWebCustomer}/login`, {
    account: data.account,
    password: encodedPassword,
  });
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
