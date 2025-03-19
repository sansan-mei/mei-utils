import axios, { type AxiosInstance, type AxiosResponse, type CreateAxiosDefaults } from "axios";
import { Methods } from "./enum";
import type { HttpOption, MyResponse } from "./type";

/**
 * 全局共享的axios实例
 * 
 * @private
 * @type {AxiosInstance}
 */
let _request: AxiosInstance

/**
 * 初始化axios实例并设置为全局默认
 *
 * @export
 * @param {CreateAxiosDefaults<any>} options axios配置选项
 * @returns {AxiosInstance} 创建的axios实例
 */
export function initAxios(options: CreateAxiosDefaults<any>) {
  const r = axios.create(options);
  _request = r
  return r
}

export { axios };


/**
 * 通用HTTP请求函数，封装了各种HTTP方法的请求处理
 *
 * @export
 * @template [T=any] 响应数据类型
 * @param {HttpOption} param0 请求配置对象
 * @param {string} param0.url 请求URL
 * @param {any} [param0.data] 请求数据
 * @param {Methods} [param0.method] 请求方法（GET/POST/PUT/DELETE）
 * @param {Record<string, string>} [param0.headers] 请求头
 * @param {(progressEvent: AxiosProgressEvent) => void} [param0.onDownloadProgress] 下载进度回调
 * @param {GenericAbortSignal} [param0.signal] 请求中断信号
 * @param {() => void} [param0.beforeRequest] 请求前执行的回调
 * @param {() => void} [param0.afterRequest] 请求后执行的回调
 * @param {'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'} [param0.responseType] 响应类型
 * @param {AxiosInstance} [param0.request] 自定义axios实例，默认使用全局实例
 * @returns {Promise<MyResponse<T>>} 封装的响应对象
 */
export function http<T = any>(
  { url, data, method, headers, onDownloadProgress, signal, beforeRequest, afterRequest, responseType, request = _request }: HttpOption,
) {
  const successHandler = (res: AxiosResponse<MyResponse<T>>) => {

    if (res.data.status === 'Success' || typeof res.data === 'string' || responseType === 'blob') return res.data

    return Promise.reject(res.data)
  }

  const failHandler = (error: MyResponse<Error>) => {
    afterRequest?.()
    throw new Error(error?.message || 'Error')
  }

  beforeRequest?.()

  method = method || Methods.GET

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

  switch (method) {
    case Methods.GET:
      return request.get(url, { params, signal, onDownloadProgress, responseType }).then(successHandler, failHandler)
    case Methods.POST:
      return request.post(url, params, { headers, signal, onDownloadProgress }).then(successHandler, failHandler)
    case Methods.DELETE:
      return request.delete(url, { params, signal, onDownloadProgress }).then(successHandler, failHandler)
    case Methods.PUT:
      return request.put(url, params, { headers, signal, onDownloadProgress }).then(successHandler, failHandler)
    default:
      throw new Error(`Invalid HTTP method: ${method}`)
  }
}

/**
 * 发送GET请求
 *
 * @export
 * @template [T=any] 响应数据类型
 * @param {HttpOption} param0 请求配置对象
 * @param {string} param0.url 请求URL
 * @param {any} [param0.data] 查询参数
 * @param {Methods} [param0.method=Methods.GET] 请求方法，固定为GET
 * @param {(progressEvent: AxiosProgressEvent) => void} [param0.onDownloadProgress] 下载进度回调
 * @param {GenericAbortSignal} [param0.signal] 请求中断信号
 * @param {() => void} [param0.beforeRequest] 请求前执行的回调
 * @param {() => void} [param0.afterRequest] 请求后执行的回调
 * @param {'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'} [param0.responseType] 响应类型
 * @returns {Promise<MyResponse<T>>} 封装的响应对象
 */
export function get<T = any>(
  { url, data, method = Methods.GET, onDownloadProgress, signal, beforeRequest, afterRequest, responseType }: HttpOption,
): Promise<MyResponse<T>> {
  return http<T>({
    url,
    method,
    data,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
    responseType,
  })
}

/**
 * 发送POST请求
 *
 * @export
 * @template [T=any] 响应数据类型
 * @param {HttpOption} param0 请求配置对象
 * @param {string} param0.url 请求URL
 * @param {any} [param0.data] 请求体数据
 * @param {Methods} [param0.method=Methods.POST] 请求方法，固定为POST
 * @param {Record<string, string>} [param0.headers] 请求头
 * @param {(progressEvent: AxiosProgressEvent) => void} [param0.onDownloadProgress] 下载进度回调
 * @param {GenericAbortSignal} [param0.signal] 请求中断信号
 * @param {() => void} [param0.beforeRequest] 请求前执行的回调
 * @param {() => void} [param0.afterRequest] 请求后执行的回调
 * @returns {Promise<MyResponse<T>>} 封装的响应对象
 */
export function post<T = any>(
  { url, data, method = Methods.POST, headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<MyResponse<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

/**
 * 发送DELETE请求
 *
 * @export
 * @template [T=any] 响应数据类型
 * @param {HttpOption} param0 请求配置对象
 * @param {string} param0.url 请求URL
 * @param {any} [param0.data] 查询参数
 * @param {Methods} [param0.method=Methods.DELETE] 请求方法，固定为DELETE
 * @param {Record<string, string>} [param0.headers] 请求头
 * @param {(progressEvent: AxiosProgressEvent) => void} [param0.onDownloadProgress] 下载进度回调
 * @param {GenericAbortSignal} [param0.signal] 请求中断信号
 * @param {() => void} [param0.beforeRequest] 请求前执行的回调
 * @param {() => void} [param0.afterRequest] 请求后执行的回调
 * @returns {Promise<MyResponse<T>>} 封装的响应对象
 */
export function Delete<T = any>(
  { url, data, method = Methods.DELETE, headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<MyResponse<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

/**
 * 发送PUT请求
 *
 * @export
 * @template [T=any] 响应数据类型
 * @param {HttpOption} param0 请求配置对象
 * @param {string} param0.url 请求URL
 * @param {any} [param0.data] 请求体数据
 * @param {Methods} [param0.method=Methods.PUT] 请求方法，固定为PUT
 * @param {Record<string, string>} [param0.headers] 请求头
 * @param {(progressEvent: AxiosProgressEvent) => void} [param0.onDownloadProgress] 下载进度回调
 * @param {GenericAbortSignal} [param0.signal] 请求中断信号
 * @param {() => void} [param0.beforeRequest] 请求前执行的回调
 * @param {() => void} [param0.afterRequest] 请求后执行的回调
 * @returns {Promise<MyResponse<T>>} 封装的响应对象
 */
export function put<T = any>(
  { url, data, method = Methods.PUT, headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<MyResponse<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}
