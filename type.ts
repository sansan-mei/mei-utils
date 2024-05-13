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
