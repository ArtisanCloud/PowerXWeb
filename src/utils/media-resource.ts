import { RequestOption, UploadRequest } from '@arco-design/web-vue';
import { MediaResource, uploadMediaResource } from '@/api/media-resource';
import { ossUrl, staticUrl } from '@/api';

export const checkUrlResourceExistence = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    return response.ok;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`发生错误: ${error}`);
    return false;
  }
};

export default function uploadMediaImages(
  option: RequestOption,
  sortIndex: number,
  onSuccess: (data: any) => void
): UploadRequest {
  let isAborted = false; // 标记是否中止上传

  const abort = () => {
    isAborted = true; // 设置标记为中止状态
  };

  const uploadPromise = uploadMediaResource(option, sortIndex)
    .then((result: any) => {
      if (!isAborted) {
        if (result.data) {
          onSuccess(result.data);
          option.onSuccess(result.data);
        } else {
          option.onError(result);
        }
      }
    })
    .catch((error: any) => {
      if (!isAborted) {
        option.onError(error);
      }
    });

  return {
    abort,
    promise: uploadPromise, // 返回上传操作的Promise对象
  };
}

export const getOssUrl = (resource: MediaResource | undefined) => {
  if (resource) {
    if (resource.isLocalStored) {
      return staticUrl(resource.url);
    }
    return ossUrl(resource.url);
  }
  return '';
};

export const getMediaResourceById = (
  medias: MediaResource[],
  mediaId: number
): MediaResource | undefined => {
  for (let i = 0; i < medias.length; i += 1) {
    if (medias[i].id === mediaId) {
      return medias[i];
    }
  }
  return undefined; // 如果未找到匹配的mediaId，则返回undefined
};

const downloadImgOnUrl = async (url: string, index: number) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `image_${index}.png`;
    link.click();
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

export const downloadImages = (medias: MediaResource[]) => {
  medias.forEach((image: MediaResource, index: number) => {
    downloadImgOnUrl(getOssUrl(image)!, index);
  });
};
