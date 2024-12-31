export const generateRandomNumber = (digits: number): number => {
  if (digits <= 0) {
    throw new Error('Number of digits should be greater than 0');
  }

  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
};

export const generateRandomNumberString = (digits: number): string => {
  if (digits <= 0) {
    throw new Error('Number of digits should be greater than 0');
  }

  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString();
};

export const truncateString = (str: string, maxLength: number): string => {
  if (maxLength <= 0) return str;

  let truncatedStr = '';
  let charCount = 0;

  Array.from(str).forEach((char) => {
    if (charCount >= maxLength) return;  // 达到最大长度时直接返回
    truncatedStr += char;  // 更新截断的字符串
    charCount += 1;  // 增加字符计数
  });

  return truncatedStr;
};
