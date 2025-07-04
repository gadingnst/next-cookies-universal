/** Cookies.interface.ts */

import type { CookieSerializeOptions } from 'cookie';

export type ICookiesOptions = CookieSerializeOptions;

export type ICookiesContext = 'server'|'client';

/**
 * Base interface for client cookie operations (synchronous)
 */
export interface IBaseCookies {
  set<T = string>(key: string, value: T, options?: ICookiesOptions): void;
  get<T>(key: string): T;
  remove(key: string, options?: ICookiesOptions): void;
  has(key: string): boolean;
  clear(): void;
}
