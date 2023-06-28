/** Cookie.base.ts */

import type { CookieSerializeOptions } from 'cookie';

export type CookiesContext = 'server'|'client';

export interface BaseCookies {
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
