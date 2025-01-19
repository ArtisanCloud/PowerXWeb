/**
 * 通用接口
 * @author Matrix-X
 * @email matrix-x@artisan-cloud.com
 * @version v1
 */
export const PrefixUriWeb = '/api/v1/web';

export const PrefixSSEUriWeb = 'sse/v1/web';

export const PowerXVersion = import.meta.env.VITE_POWERX_VERSION ?? 'v1.0.0';

export const DefaultPageSize = 10;
export const MaxPageSize = 9999;

const OSSHost = import.meta.env.VITE_OSS_URL;
const ResourceHost = import.meta.env.VITE_RESOURCE_URL;

export interface PowerModel {
  id?: number;
  uuid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface imageAbleInfo {
  icon?: string;
  backgroundColor?: string;
  imageURL?: string;
}

export const webStaticURL = (uri: string): string => {
  if (uri === undefined) {
    return '';
  }
  return `/static/images/temp/${uri}`;
};

export const staticUrl = (uri: string): string => {
  if (uri === undefined) {
    return '';
  }
  const normalizedUri = uri.startsWith('/') ? uri.slice(1) : uri;
  return `${ResourceHost}/${normalizedUri}`;
};

export const ossUrl = (uri: string): string => {
  if (uri === undefined) {
    return '';
  }
  const normalizedUri = uri.startsWith('/') ? uri.slice(1) : uri;
  return `${OSSHost}/${normalizedUri}`;
};
