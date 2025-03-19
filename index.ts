import type {
  ConvertKeysToCamelCase,
  ConvertKeysToSnakeCase,
  IPInfo,
} from "./type";

/**
 * 检查值是否为数字类型
 *
 * @export
 * @template {number} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is number} 如果是数字则返回true
 */
export function isNumber<T extends number>(
  value: T | unknown,
): value is number {
  return Object.prototype.toString.call(value) === "[object Number]";
}

/**
 * 检查值是否为字符串类型
 *
 * @export
 * @template {string} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is string} 如果是字符串则返回true
 */
export function isString<T extends string>(
  value: T | unknown,
): value is string {
  return Object.prototype.toString.call(value) === "[object String]";
}

/**
 * 检查值是否为布尔类型
 *
 * @export
 * @template {boolean} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is boolean} 如果是布尔值则返回true
 */
export function isBoolean<T extends boolean>(
  value: T | unknown,
): value is boolean {
  return Object.prototype.toString.call(value) === "[object Boolean]";
}

/**
 * 检查值是否为null
 *
 * @export
 * @template {null} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is null} 如果是null则返回true
 */
export function isNull<T extends null>(value: T | unknown): value is null {
  return Object.prototype.toString.call(value) === "[object Null]";
}

/**
 * 检查值是否为undefined
 *
 * @export
 * @template {undefined} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is undefined} 如果是undefined则返回true
 */
export function isUndefined<T extends undefined>(
  value: T | unknown,
): value is undefined {
  return Object.prototype.toString.call(value) === "[object Undefined]";
}

/**
 * 检查值是否为普通对象
 *
 * @export
 * @template {object} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is object} 如果是普通对象则返回true
 */
export function isObject<T extends object>(
  value: T | unknown,
): value is object {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * 检查值是否为数组
 *
 * @export
 * @template {any[]} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是数组则返回true
 */
export function isArray<T extends any[]>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Array]";
}

/**
 * 检查值是否为函数
 *
 * @export
 * @template {(...args: any[]) => any | void | never} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是函数则返回true
 */
export function isFunction<T extends (...args: any[]) => any | void | never>(
  value: T | unknown,
): value is T {
  return Object.prototype.toString.call(value) === "[object Function]";
}

/**
 * 检查值是否为日期对象
 *
 * @export
 * @template {Date} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是日期对象则返回true
 */
export function isDate<T extends Date>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Date]";
}

/**
 * 检查值是否为正则表达式
 *
 * @export
 * @template {RegExp} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是正则表达式则返回true
 */
export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}

/**
 * 检查值是否为Promise对象
 *
 * @export
 * @template {Promise<any>} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是Promise对象则返回true
 */
export function isPromise<T extends Promise<any>>(
  value: T | unknown,
): value is T {
  return Object.prototype.toString.call(value) === "[object Promise]";
}

/**
 * 检查值是否为Set对象
 *
 * @export
 * @template {Set<any>} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是Set对象则返回true
 */
export function isSet<T extends Set<any>>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Set]";
}

/**
 * 检查值是否为Map对象
 *
 * @export
 * @template {Map<any, any>} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是Map对象则返回true
 */
export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Map]";
}

/**
 * 检查值是否为File对象
 *
 * @export
 * @template {File} T
 * @param {(T | unknown)} value 要检查的值
 * @returns {value is T} 如果是File对象则返回true
 */
export function isFile<T extends File>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object File]";
}

/**
 * 回调函数类型定义
 *
 * @typedef {CallbackFunc}
 * @template {unknown[]} T
 */
type CallbackFunc<T extends unknown[]> = (...args: T) => void;

/**
 * 创建防抖函数，在指定等待时间内多次调用仅执行最后一次
 *
 * @export
 * @template {unknown[]} T
 * @param {CallbackFunc<T>} func 需要防抖的函数
 * @param {number} wait 等待时间（毫秒）
 * @returns {(...args: T) => void} 防抖处理后的函数
 */
export function debounce<T extends unknown[]>(
  func: CallbackFunc<T>,
  wait: number,
): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: T) => {
    const later = () => {
      clearTimeout(timeoutId);
      func(...args);
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);
  };
}

/**
 * 将下划线命名转换为驼峰命名
 *
 * @export
 * @param {string} [str=""] 要转换的字符串
 * @returns {string} 转换后的驼峰命名字符串
 */
export function toCamelCase(str = "") {
  return str.replace(/_([a-z])/g, (match, p1: string) => p1.toUpperCase());
}

/**
 * 将对象的所有键名从下划线命名转换为驼峰命名
 *
 * @export
 * @template {AnyObject} T
 * @param {T} obj 要转换的对象
 * @returns {ConvertKeysToCamelCase<T>} 键名转换为驼峰命名的新对象
 */
export function convertKeysToCamelCase<T extends AnyObject>(
  obj: T,
): ConvertKeysToCamelCase<T> {
  const newObj: AnyObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = toCamelCase(key);
      newObj[camelCaseKey] = obj[key];
    }
  }
  return newObj as ConvertKeysToCamelCase<T>;
}

/**
 * 将驼峰命名转换为下划线命名
 *
 * @export
 * @param {string} [str=""] 要转换的字符串
 * @returns {string} 转换后的下划线命名字符串
 */
export function toSnakeCase(str = ""): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * 将对象的所有键名从驼峰命名转换为下划线命名
 *
 * @export
 * @template {AnyObject} T
 * @param {T} obj 要转换的对象
 * @returns {ConvertKeysToSnakeCase<T>} 键名转换为下划线命名的新对象
 */
export function convertKeysToSnakeCase<T extends AnyObject>(
  obj: T,
): ConvertKeysToSnakeCase<T> {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const newKey = toSnakeCase(key);
      newObj[newKey] = obj[key];
    }
  }
  return newObj as ConvertKeysToSnakeCase<T>;
}

/**
 * 初始化回调函数管理器，用于延迟执行回调并自动管理回调集合
 *
 * @returns {(...cbs: Function[]) => void} 回调管理函数
 */
export const initCallback = () => {
  const callbacks = new Set<Function>();
  let timer: ReturnType<typeof setTimeout>;
  return function r(...cbs: Function[]) {
    cbs.forEach((cb) => {
      if (typeof cb === "function") {
        callbacks.add(cb); // Add the function to the set

        clearTimeout(timer);
        // Schedule the function for execution
        timer = setTimeout(() => {
          try {
            cb(); // Execute the function
          } catch (error) {
            console.warn(error); // Catch and log any errors
          } finally {
            callbacks.has(cb) && callbacks.delete(cb); // Remove the function from the set after execution
          }
        }, 500);
      }
    });
  };
};

/**
 * 获取IP地址的地理位置信息
 *
 * @async
 * @param {string} [ip=""] IP地址，为空时获取当前IP信息
 * @returns {Promise<IPInfo>} IP信息，包括地理位置、ISP等
 */
export const getLocation = async (ip: string = ""): Promise<IPInfo> => {
  const args: RequestInit = {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
      "cache-control": "no-cache",
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundaryAogZKzPP6ncoO7Z7",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer: "https://www.ip-score.com/" + (ip ? `custom/${ip}` : ""),
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `------WebKitFormBoundaryAogZKzPP6ncoO7Z7\r\nContent-Disposition: form-data; name=\"ip\"\r\n\r\n${ip}\r\n------WebKitFormBoundaryAogZKzPP6ncoO7Z7--\r\n`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  };
  return fetch("https://www.ip-score.com/json", { ...args }).then((res) =>
    res.json(),
  );
};

/**
 * 任务队列类，用于顺序执行异步任务
 * 
 * @export
 * @class Queue
 */
export class Queue {
  /**
   * 待执行的任务数组
   */
  tasks: Function[];
  
  /**
   * 队列是否正在执行中
   */
  executing: boolean;

  /**
   * 初始化任务队列
   */
  constructor() {
    this.tasks = [];
    this.executing = false;
  }

  /**
   * 添加任务到队列并返回Promise
   * 
   * @param {Function} task 要执行的任务函数，可返回Promise
   * @returns {Promise<any>} 任务执行的结果
   */
  add(task: Function) {
    return new Promise((resolve, reject) => {
      this.tasks.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.execute();
    });
  }

  /**
   * 执行队列中的任务，按顺序逐个执行
   * 
   * @private
   * @async
   * @returns {Promise<void>}
   */
  async execute() {
    if (this.executing) return;
    this.executing = true;
    while (this.tasks.length) {
      const task = this.tasks.shift();
      if (!task) continue;
      await task();
    }
    this.executing = false;
  }
}

/**
 * 格式化日期为指定格式字符串
 * 
 * @export
 * @param {Date | string | number} date 日期对象、时间戳或日期字符串
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] 格式模板，支持YYYY(年)、MM(月)、DD(日)、HH(时)、mm(分)、ss(秒)
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 计算两个日期之间的时间差
 * 
 * @export
 * @param {Date | string | number} date1 第一个日期
 * @param {Date | string | number} [date2=new Date()] 第二个日期，默认为当前时间
 * @param {'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'} [unit='milliseconds'] 返回差值的单位
 * @returns {number} 两个日期之间的时间差，以指定单位表示
 */
export function dateDiff(
  date1: Date | string | number, 
  date2: Date | string | number = new Date(), 
  unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' = 'milliseconds'
): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  const diff = Math.abs(d2 - d1);
  
  switch (unit) {
    case 'days': return diff / (1000 * 60 * 60 * 24);
    case 'hours': return diff / (1000 * 60 * 60);
    case 'minutes': return diff / (1000 * 60);
    case 'seconds': return diff / 1000;
    default: return diff;
  }
}

/**
 * 深度合并两个对象，包括嵌套对象
 * 
 * @export
 * @template {object} T 目标对象类型
 * @template {object} U 源对象类型
 * @param {T} target 目标对象
 * @param {U} source 源对象
 * @returns {T & U} 合并后的对象
 */
export function deepMerge<T extends object = object, U extends object = T>(target: T, source: U): T & U {
  const isObject = (obj: any): obj is object => obj && typeof obj === 'object' && !Array.isArray(obj);
  
  if (!isObject(target) || !isObject(source)) {
    return source as T & U;
  }
  
  const output = { ...target } as { [key: string]: any };
  
  Object.keys(source).forEach(key => {
    const targetValue = output[key];
    const sourceValue = (source as { [key: string]: any })[key];
    
    if (isObject(targetValue) && isObject(sourceValue)) {
      output[key] = deepMerge(targetValue, sourceValue);
    } else if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      output[key] = [...targetValue, ...sourceValue];
    } else {
      output[key] = sourceValue;
    }
  });
  
  return output as T & U;
}

/**
 * 根据路径获取对象的深层属性值
 * 
 * @export
 * @template T 返回值类型
 * @param {Record<string, any>} obj 要获取属性的对象
 * @param {string} path 属性路径，用点号分隔，如 'user.profile.name'
 * @param {T} [defaultValue] 当属性不存在时的默认值
 * @returns {T | undefined} 获取到的属性值或默认值
 */
export function getNestedValue<T = any>(obj: Record<string, any>, path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return (current === undefined) ? defaultValue : current as T;
}

/**
 * 将数组按指定条件分组
 * 
 * @export
 * @template T 数组元素类型
 * @param {T[]} array 要分组的数组
 * @param {(item: T) => string} keySelector 从数组元素提取分组键的函数
 * @returns {Record<string, T[]>} 分组后的对象，键为分组条件，值为符合条件的元素数组
 */
export function groupBy<T>(array: T[], keySelector: (item: T) => string): Record<string, T[]> {
  return array.reduce((result, item) => {
    const key = keySelector(item);
    result[key] = result[key] || [];
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * 截断字符串到指定长度，并添加后缀
 * 
 * @export
 * @param {string} str 要截断的字符串
 * @param {number} length 最大长度
 * @param {string} [suffix='...'] 当字符串被截断时添加的后缀
 * @returns {string} 截断后的字符串
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
}

/**
 * 生成指定长度的随机字符串
 * 
 * @export
 * @param {number} [length=8] 生成的字符串长度
 * @param {string} [chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'] 用于生成随机字符串的字符集
 * @returns {string} 生成的随机字符串
 */
export function randomString(length = 8, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = '';
  const charsLength = chars.length;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  
  return result;
}

/**
 * 将字符串转换为 URL 友好的 slug 格式
 * 
 * @export
 * @param {string} str 要转换的字符串
 * @returns {string} 转换后的 slug 字符串，小写且用连字符分隔
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 创建节流函数，限制函数在一定时间内只能执行一次
 * 
 * @export
 * @template {unknown[]} T 函数参数类型
 * @param {(...args: T) => void} func 需要节流的函数
 * @param {number} wait 等待时间（毫秒）
 * @returns {(...args: T) => void} 节流处理后的函数
 */
export function throttle<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: T): void {
    const now = Date.now();
    const remaining = wait - (now - lastCallTime);
    
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      lastCallTime = now;
      func(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        func(...args);
      }, remaining);
    }
  };
}
