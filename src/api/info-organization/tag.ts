import { imageAbleInfo, PowerModel } from '@/api';
import axios from 'axios';
import { PrefixUriWeb } from '@/api';
import { MediaSet } from '@/api/media-resource';
import UriInfoOrganization from '@/api/info-organization';

export const UriTag = '/tags';

export interface Tag extends PowerModel, imageAbleInfo, MediaSet {
  pId?: number;
  name: string;
  sort?: number;
  viceName?: string;
  description?: string;
  children?: Tag[];
}

export interface GetTagTreeRequest {
  id: number;
}

export interface GetTagTreeReply {
  tree: Tag[];
}

export function getTagTree(request: GetTagTreeRequest) {
  return axios.get<GetTagTreeReply>(
    `${PrefixUriWeb + UriInfoOrganization}/tag-tree`,
    {
      params: request,
    }
  );
}

export type CreateTagRequest = Tag;

export type CreateTagReply = Tag;

export type UpdateTagRequest = Tag;
export type UpdateTagReply = Tag;

export function createTag(request: CreateTagRequest) {
  return axios.post<CreateTagReply>(
    `${PrefixUriWeb + UriInfoOrganization + UriTag}`,
    request
  );
}

export function updateTag(request: UpdateTagRequest) {
  return axios.put<UpdateTagReply>(
    `${PrefixUriWeb + UriInfoOrganization + UriTag}/${request.id}`,
    request
  );
}

export interface DeleteTagRequest {
  id: number;
}

export interface DeleteTagReply {
  id: number;
}

export function deleteTag(request: DeleteTagRequest) {
  return axios.delete<DeleteTagReply>(
    `${PrefixUriWeb + UriInfoOrganization + UriTag}/${request.id}`
  );
}
