/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookies.server.ts */

import type { cookies as ICookies } from 'next/headers';

import type { IBaseCookies, ICookiesOptions } from './Cookies.interface';

class CookiesServer implements IBaseCookies {
  private cookies: typeof ICookies;

  constructor() {
    this.cookies = require('next/headers').cookies;
  }

  public set<T = string>(
    key: string,
    value: T,
    options: ICookiesOptions = {}
  ) {
    this.cookies().set(key.trim(), JSON.stringify(value), {
      path: '/',
      ...options
    });
  }

  public get<T>(key: string): T {
    const value = this.cookies().get(key.trim())?.value ?? 'null';
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  }

  public remove(key: string, options: ICookiesOptions = {}) {
    this.cookies().delete({
      name: key.trim(),
      value: '',
      path: '/',
      expires: new Date('1970-02-01'),
      ...options
    });
  }

  public has(key: string) {
    return this.cookies().has(key.trim());
  }

  public clear() {
    this.cookies()
      .getAll()
      .map(({ name }) => this.remove(name));
  }
}

export default CookiesServer;
