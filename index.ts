import type {
  ConvertKeysToCamelCase,
  ConvertKeysToSnakeCase,
  IPInfo,
} from "./type";

/**
 * Description placeholder
 *
 * @export
 * @template {number} T
 * @param {(T | unknown)} value
 * @returns {value is number}
 */
export function isNumber<T extends number>(
  value: T | unknown,
): value is number {
  return Object.prototype.toString.call(value) === "[object Number]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {string} T
 * @param {(T | unknown)} value
 * @returns {value is string}
 */
export function isString<T extends string>(
  value: T | unknown,
): value is string {
  return Object.prototype.toString.call(value) === "[object String]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {boolean} T
 * @param {(T | unknown)} value
 * @returns {value is boolean}
 */
export function isBoolean<T extends boolean>(
  value: T | unknown,
): value is boolean {
  return Object.prototype.toString.call(value) === "[object Boolean]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {null} T
 * @param {(T | unknown)} value
 * @returns {value is null}
 */
export function isNull<T extends null>(value: T | unknown): value is null {
  return Object.prototype.toString.call(value) === "[object Null]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {undefined} T
 * @param {(T | unknown)} value
 * @returns {value is undefined}
 */
export function isUndefined<T extends undefined>(
  value: T | unknown,
): value is undefined {
  return Object.prototype.toString.call(value) === "[object Undefined]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {object} T
 * @param {(T | unknown)} value
 * @returns {value is object}
 */
export function isObject<T extends object>(
  value: T | unknown,
): value is object {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {any[]} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isArray<T extends any[]>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Array]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {(...args: any[]) => any | void | never} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isFunction<T extends (...args: any[]) => any | void | never>(
  value: T | unknown,
): value is T {
  return Object.prototype.toString.call(value) === "[object Function]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {Date} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isDate<T extends Date>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Date]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {RegExp} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {Promise<any>} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isPromise<T extends Promise<any>>(
  value: T | unknown,
): value is T {
  return Object.prototype.toString.call(value) === "[object Promise]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {Set<any>} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isSet<T extends Set<any>>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Set]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {Map<any, any>} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Map]";
}

/**
 * Description placeholder
 *
 * @export
 * @template {File} T
 * @param {(T | unknown)} value
 * @returns {value is T}
 */
export function isFile<T extends File>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object File]";
}

/**
 * Description placeholder
 *
 * @typedef {CallbackFunc}
 * @template {unknown[]} T
 */
type CallbackFunc<T extends unknown[]> = (...args: T) => void;

/**
 * Description placeholder
 *
 * @export
 * @template {unknown[]} T
 * @param {CallbackFunc<T>} func
 * @param {number} wait
 * @returns {(...args: T) => void}
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
 * Description placeholder
 *
 * @export
 * @param {string} [str=""]
 * @returns {*}
 */
export function toCamelCase(str = "") {
  return str.replace(/_([a-z])/g, (match, p1: string) => p1.toUpperCase());
}

/**
 * Description placeholder
 *
 * @export
 * @template {AnyObject} T
 * @param {T} obj
 * @returns {ConvertKeysToCamelCase<T>}
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
 * Description placeholder
 *
 * @export
 * @param {string} [str=""]
 * @returns {string}
 */
export function toSnakeCase(str = ""): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * Description placeholder
 *
 * @export
 * @template {AnyObject} T
 * @param {T} obj
 * @returns {ConvertKeysToSnakeCase<T>}
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
 * Description placeholder
 *
 * @type {(...cbs: {}) => void}
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
 * Description placeholder
 *
 * @async
 * @returns {Promise<IPInfo>}
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

export class Queue {
  tasks: Function[];
  executing: boolean;

  constructor() {
    this.tasks = [];
    this.executing = false;
  }

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
