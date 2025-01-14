export const scaleImageSizeByRatio = (
  baseSize: number,
  width: number,
  height: number,
  ratio: number
) => {
  // 如果 width 和 height 都为 0，则按照 baseSize 和 ratio 计算
  if (width === 0 && height === 0) {
    width = baseSize;
    height = Math.round(baseSize / ratio);
  } else if (width > height) {
    // 使用基准宽度 baseSize，计算高度
    height = baseSize;
    width = Math.round(baseSize / ratio);
  } else {
    // 使用基准高度 baseSize，计算宽度
    width = baseSize;
    height = Math.round(baseSize * ratio);
  }

  return { width, height };
};

export const scaleImageSize = (
  baseSize: number,
  width: number,
  height: number
) => {
  // 如果 width 和 height 都为 0，则返回基准尺寸
  if (width === 0 && height === 0) {
    return { width: baseSize, height: baseSize };
  }

  // 计算新的宽度和高度
  let newWidth;
  let newHeight;
  if (width > height) {
    // 使用基准宽度 baseSize，计算高度
    newWidth = baseSize;
    newHeight = Math.round((baseSize * height) / width); // 四舍五入到整数
  } else {
    // 使用基准高度 baseSize，计算宽度
    newHeight = baseSize;
    newWidth = Math.round((baseSize * width) / height); // 四舍五入到整数
  }

  return { width: newWidth, height: newHeight };
};

export const calculateNewDimensions = (
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
) => {
  let newWidth = img.width;
  let newHeight = img.height;

  if (img.width > maxWidth) {
    newWidth = maxWidth;
    newHeight = (img.height * maxWidth) / img.width;
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = (img.width * maxHeight) / img.height;
  }

  return { newWidth, newHeight };
};

export const compressImage = (
  file: any,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('无法获取2D渲染上下文'));
        return;
      }

      const { newWidth, newHeight } = calculateNewDimensions(
        img,
        maxWidth,
        maxHeight
      );
      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // 将压缩后的图片转换成Blob，并使用Promise包装
      new Promise<Blob | null>((resolveBlob) => {
        canvas.toBlob(
          (compressedBlob) => {
            resolveBlob(compressedBlob);
          },
          file.type, // 保持原始图片类型
          quality // 图片质量，可以根据需要进行调整
        );
      }).then((compressedBlob) => {
        if (compressedBlob) {
          resolve(compressedBlob); // 将压缩后的Blob传递给resolve
        } else {
          reject(new Error('无法生成压缩后的Blob'));
        }
      });
    };

    img.src = URL.createObjectURL(file);
  });
};

export const checkPixelTransparency = (
  image: HTMLImageElement,
  x: number,
  y: number
) => {
  // 创建一个临时的画布和上下文
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;

  // 在画布上绘制图像
  ctx?.drawImage(image, 0, 0, image.width, image.height);

  // 获取指定坐标位置的像素数据
  const pixelData = ctx?.getImageData(x, y, 1, 1).data;

  // 检查该像素的 alpha 值
  // @ts-ignore
  const alpha = pixelData[3];

  // 返回透明度判断结果
  return alpha < 128;
};
