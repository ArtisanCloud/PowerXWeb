import { PowerModel, PrefixUriWeb } from '@/api';
import axios from 'axios';
import { Pagination } from '@/types/global';

const UriMembership = '/memberships';
export interface Membership extends PowerModel {
  id: number;
  name: string;
  mainMembershipId: number;
  membershipId: number;
  membershipItemId: number;
  customerId: number;
  productId: number;
  startDate: string;
  endDate: string;
  status: number;
  type: number;
  extendPeriod: boolean;
  plan: number;
}

export interface ListMembershipPageRequest extends Pagination {
  ids?: number[];
  name?: string;
  startAt?: string;
  endAt?: string;
  typeIds?: number[];
  statusIds?: number[];
  storeIds?: number[];
  dates?: Date[];
}

export interface ListMembershipPageReply extends Pagination {
  list: Membership[];
}

export function listMemberships(request: ListMembershipPageRequest) {
  return axios.get<ListMembershipPageReply>(
    `${PrefixUriWeb + UriMembership}/page-list`,
    {
      params: request,
    }
  );
}
