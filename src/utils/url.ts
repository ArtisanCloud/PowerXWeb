export const buildUri = (baseUri: string, paths: string[]): string => {
  // 去除 baseUri 的尾部斜杠
  const trimmedBaseUri = baseUri.replace(/\/$/, '');

  // 过滤掉 paths 数组中的空字符串
  const filteredPaths = paths.filter((path) => path !== '');

  // 拼接 baseUri 和有效的 paths
  return `${trimmedBaseUri}/${filteredPaths.join('/')}`;
};

export const buildUrlWithParams = (
  baseUri: string,
  paths: string[],
  params?: Record<string, string | number>
): string => {
  // 使用 buildUri 构建基础的 URL
  let url = buildUri(baseUri, paths);

  // 如果有 params，则添加查询参数
  if (params) {
    // 将 params 中的 number 类型转换为 string 类型
    const query = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();
    url += `?${query}`;
  }

  return url;
};
