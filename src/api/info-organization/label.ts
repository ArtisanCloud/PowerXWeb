import {imageAbleInfo, PowerModel, PrefixUriWeb} from '@/api';
import axios from 'axios';
import { MediaSet } from '@/api/media-resource';
import UriInfoOrganization from '@/api/info-organization';

export const UriLabel = '/labels';

export interface Label extends PowerModel, imageAbleInfo, MediaSet {
  pId?: number;
  name: string;
  sort?: number;
  viceName?: string;
  description?: string;
  children?: Label[];
}

export interface GetLabelTreeRequest {
  id: number;
}

export interface GetLabelTreeReply {
  tree: Label[];
}

export function getLabelTree(request: GetLabelTreeRequest) {
  return axios.get<GetLabelTreeReply>(
    `${PrefixUriWeb + UriInfoOrganization}/label-tree`,
    {
      params: request,
    }
  );
}

export type CreateLabelRequest = Label;

export type CreateLabelReply = Label;

export type UpdateLabelRequest = Label;
export type UpdateLabelReply = Label;

export function createLabel(request: CreateLabelRequest) {
  return axios.post<CreateLabelReply>(
    `${PrefixUriWeb + UriInfoOrganization + UriLabel}`,
    request
  );
}

export function updateLabel(request: UpdateLabelRequest) {
  return axios.put<UpdateLabelReply>(
    `${PrefixUriWeb + UriInfoOrganization + UriLabel}/${request.id}`,
    request
  );
}

export interface DeleteLabelRequest {
  id: number;
}

export interface DeleteLabelReply {
  id: number;
}

export function deleteLabel(request: DeleteLabelRequest) {
  return axios.delete<DeleteLabelReply>(
    `${PrefixUriWeb + UriInfoOrganization + UriLabel}/${request.id}`
  );
}
