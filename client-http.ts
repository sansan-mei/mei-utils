import axios, { type AxiosResponse, type CreateAxiosDefaults } from "axios";
import { Methods } from "./enum";
import type { HttpOption, MyResponse } from "./type";


/**
 * Description placeholder
 *
 * @export
 * @param {CreateAxiosDefaults<any>} options
 * @returns {*}
 */
export function initAxios(options: CreateAxiosDefaults<any>) {
  return axios.create(options);
}

/**
 * Description placeholder
 *
 * @type {*}
 */
const request = initAxios({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

/**
 * Description placeholder
 *
 * @export
 * @template [T=any]
 * @param {HttpOption} param0
 * @param {HttpOption} param0.url
 * @param {HttpOption} param0.data
 * @param {HttpOption} param0.method
 * @param {HttpOption} param0.headers
 * @param {HttpOption} param0.onDownloadProgress
 * @param {HttpOption} param0.signal
 * @param {HttpOption} param0.beforeRequest
 * @param {HttpOption} param0.afterRequest
 * @param {HttpOption} param0.responseType
 * @returns {*}
 */
export function http<T = any>(
  { url, data, method, headers, onDownloadProgress, signal, beforeRequest, afterRequest, responseType }: HttpOption,
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
 * Description placeholder
 *
 * @export
 * @template [T=any]
 * @param {HttpOption} param0
 * @param {HttpOption} param0.url
 * @param {HttpOption} param0.data
 * @param {HttpOption} [param0.method=Methods.GET]
 * @param {HttpOption} param0.onDownloadProgress
 * @param {HttpOption} param0.signal
 * @param {HttpOption} param0.beforeRequest
 * @param {HttpOption} param0.afterRequest
 * @param {HttpOption} param0.responseType
 * @returns {Promise<MyResponse<T>>}
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
 * Description placeholder
 *
 * @export
 * @template [T=any]
 * @param {HttpOption} param0
 * @param {HttpOption} param0.url
 * @param {HttpOption} param0.data
 * @param {HttpOption} [param0.method=Methods.POST]
 * @param {HttpOption} param0.headers
 * @param {HttpOption} param0.onDownloadProgress
 * @param {HttpOption} param0.signal
 * @param {HttpOption} param0.beforeRequest
 * @param {HttpOption} param0.afterRequest
 * @returns {Promise<MyResponse<T>>}
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
 * Description placeholder
 *
 * @export
 * @template [T=any]
 * @param {HttpOption} param0
 * @param {HttpOption} param0.url
 * @param {HttpOption} param0.data
 * @param {HttpOption} [param0.method=Methods.DELETE]
 * @param {HttpOption} param0.headers
 * @param {HttpOption} param0.onDownloadProgress
 * @param {HttpOption} param0.signal
 * @param {HttpOption} param0.beforeRequest
 * @param {HttpOption} param0.afterRequest
 * @returns {Promise<MyResponse<T>>}
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
 * Description placeholder
 *
 * @export
 * @template [T=any]
 * @param {HttpOption} param0
 * @param {HttpOption} param0.url
 * @param {HttpOption} param0.data
 * @param {HttpOption} [param0.method=Methods.PUT]
 * @param {HttpOption} param0.headers
 * @param {HttpOption} param0.onDownloadProgress
 * @param {HttpOption} param0.signal
 * @param {HttpOption} param0.beforeRequest
 * @param {HttpOption} param0.afterRequest
 * @returns {Promise<MyResponse<T>>}
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
