/**
 * 通用接口
 * @author Matrix-X
 * @email matrix-x@artisan-cloud.com
 * @version v1
 */
export const PrefixUriWeb = '/api/v1/web';
export const DefaultPageSize = 10;
export const MaxPageSize = 9999;

const OSSHost = import.meta.env.VITE_OSS_HOST;
const ResourceHost = import.meta.env.VITE_RESOURCE_HOST;
const APIHost = import.meta.env.VITE_API_HOST;
const APIURIVersion = import.meta.env.VITE_API_VERSION;

export interface PowerModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface imageAbleInfo {
  icon?: string;
  backgroundColor?: string;
  imageURL?: string;
}

export const restURL = (uri: string): string => {
  return `${APIHost}/${APIURIVersion}/${uri}`;
};

export const staticURL = (uri: string): string => {
  // console.log(ResourceHost  + uri)
  return ResourceHost + uri;
};

export const ossURL = (uri: string): string => {
  return OSSHost + uri;
};

export const webStaticURL = (uri: string): string => {
  if (uri === undefined) {
    return '';
  }
  return `/static/images/temp/${uri}`;
};
