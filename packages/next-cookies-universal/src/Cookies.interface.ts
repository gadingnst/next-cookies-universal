/** Cookie.interface.ts */

import type { CookieSerializeOptions } from 'cookie';

export type ICookiesContext = 'server'|'client';

export interface IBaseCookies {
  set<T = string>(
    key: string,
    value: T,
    options?: CookieSerializeOptions
  ): void;

  get<T = string>(key: string): T;

  remove(key: string, options?: CookieSerializeOptions): void;

  has(key: string): boolean;

  clear(): void;
}
