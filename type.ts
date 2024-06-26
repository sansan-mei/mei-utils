import type { AxiosInstance, AxiosProgressEvent, GenericAbortSignal } from "axios";
import type { Methods } from "./enum";

type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : S extends `${infer P1}-${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

export type ConvertKeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K];
};

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? T extends Capitalize<T>
  ? `_${Lowercase<T>}${SnakeCase<U>}`
  : `${T}${SnakeCase<U>}`
  : S;

export type ConvertKeysToSnakeCase<T> = {
  [K in keyof T as SnakeCase<string & K>]: T[K];
};

export interface HttpOption {
  url: string
  data?: any
  method?: Methods
  headers?: any
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  signal?: GenericAbortSignal
  beforeRequest?: () => void
  afterRequest?: () => void
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
  request?: AxiosInstance
}

export interface MyResponse<T = any> {
  code: number
  data: T
  message: string
  status: 'Success' | 'Fail' | 'Unauthorized'
}

interface GeoIP {
  country: string;
  countrycode: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
  timezone: string;
}

interface GeoIP2 extends GeoIP {
  zip?: string; // 可选字段，因为geoip1中没有zip
}

export interface IPInfo {
  ip: string;
  status: boolean;
  useragent: string;
  geoip1: GeoIP;
  geoip2: GeoIP2;
  isp: string;
  org: string;
  asn: string;
}
