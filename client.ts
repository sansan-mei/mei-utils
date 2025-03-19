/**
 * 获取指定名称的cookie值
 *
 * @export
 * @param {string} cookieName 要获取的cookie名称
 * @returns {string} 解码后的cookie值，若不存在则返回空字符串
 */
export function getCookieValue(cookieName: string): string {
  const cookieValue = document.cookie.match(
    `(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`,
  );
  return decodeURIComponent((cookieValue ? cookieValue.pop() : "") as string);
}

/**
 * 设置cookie值，支持过期时间
 *
 * @export
 * @param {string} name cookie名称
 * @param {string} value cookie值
 * @param {number} [days=30] 过期天数，默认30天
 */
export function setCookieValue(name: string, value: string, days = 30) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  name = encodeURIComponent(name);
  value = encodeURIComponent(value);
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/**
 * 将文本复制到剪贴板
 *
 * @export
 * @param {string} text 要复制的文本
 * @returns {Promise<string>} 成功时返回复制的文本，失败时reject错误
 */
export function copyToClip(text: string) {
  return new Promise((resolve, reject) => {
    try {
      const input: HTMLTextAreaElement = document.createElement("textarea");
      input.setAttribute("readonly", "readonly");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      if (document.execCommand("copy")) document.execCommand("copy");
      document.body.removeChild(input);
      resolve(text);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * localStorage 存储项，支持自动JSON序列化和过期时间
 */
export const storage = {
  /**
   * 设置存储项到localStorage，支持过期时间
   * 
   * @param {string} key 键名
   * @param {any} value 要存储的值（会被JSON序列化）
   * @param {number} [expiresInSeconds] 过期时间（秒），不设置则永不过期
   */
  set(key: string, value: any, expiresInSeconds?: number): void {
    const item = {
      value,
      expires: expiresInSeconds ? Date.now() + expiresInSeconds * 1000 : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  /**
   * 从localStorage获取存储项，自动处理过期逻辑
   * 
   * @template T 返回值类型
   * @param {string} key 键名
   * @param {T} [defaultValue] 当项不存在或已过期时返回的默认值
   * @returns {T | undefined} 存储的值或默认值
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return defaultValue;
    
    try {
      const item = JSON.parse(itemStr);
      if (item.expires && Date.now() > item.expires) {
        localStorage.removeItem(key);
        return defaultValue;
      }
      return item.value as T;
    } catch (e) {
      return defaultValue;
    }
  },
  
  /**
   * 从localStorage中移除指定键名的存储项
   * 
   * @param {string} key 要移除的键名
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },
  
  /**
   * 清空localStorage中的所有存储项
   */
  clear(): void {
    localStorage.clear();
  }
};

/**
 * 从URL中解析查询参数
 * 
 * @export
 * @param {string} [url] 要解析的URL，默认使用当前页面URL
 * @returns {Record<string, string>} 包含所有查询参数的对象
 */
export function getUrlParams(url?: string): Record<string, string> {
  const urlObj = new URL(url || window.location.href);
  const params: Record<string, string> = {};
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

/**
 * 构建URL查询字符串
 * 
 * @export
 * @param {Record<string, string | number | boolean | null | undefined>} params 参数对象
 * @returns {string} 生成的查询字符串，以?开头
 */
export function buildQueryString(params: Record<string, string | number | boolean | null | undefined>): string {
  const urlSearchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      urlSearchParams.append(key, String(value));
    }
  });
  
  const queryString = urlSearchParams.toString();
  return queryString ? `?${queryString}` : '';
}
