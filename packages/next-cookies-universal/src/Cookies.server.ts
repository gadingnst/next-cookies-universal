/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookies.server.ts */

import type { cookies as ICookies } from 'next/headers';

import type { IBaseCookies, ICookiesOptions } from './Cookies.interface';

class CookiesServer implements IBaseCookies {
  private cookies: typeof ICookies;
  private cookieStore: any;

  constructor() {
    this.cookies = require('next/headers').cookies;
  }

  /**
   * Initialize the cookie store asynchronously
   * @returns Promise<CookiesServer> - The initialized instance
   */
  public async initialize(): Promise<CookiesServer> {
    this.cookieStore = await this.cookies();
    return this;
  }

  public set<T = string>(
    key: string,
    value: T,
    options: ICookiesOptions = {}
  ): void {
    this.cookieStore.set(key.trim(), JSON.stringify(value), {
      path: '/',
      ...options
    });
  }

  public get<T>(key: string): T {
    const value = this.cookieStore.get(key.trim())?.value ?? 'null';
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  }

  public remove(key: string, options: ICookiesOptions = {}): void {
    this.cookieStore.delete({
      name: key.trim(),
      path: '/',
      expires: new Date('1970-02-01'),
      ...options
    });
  }

  public has(key: string): boolean {
    return this.cookieStore.has(key.trim());
  }

  public clear(): void {
    const allCookies = this.cookieStore.getAll();
    for (const { name } of allCookies) {
      this.remove(name);
    }
  }
}

export default CookiesServer;
