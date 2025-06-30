/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookies.client.ts */
'use client';

import type ICookies from 'js-cookie';

import type { IBaseCookies, ICookiesOptions } from './Cookies.interface';

class CookiesClient implements IBaseCookies {
  private cookies: typeof ICookies;

  constructor() {
    this.cookies = require('js-cookie');
  }

  public set<T = string>(
    key: string,
    value: T,
    options: ICookiesOptions = {}
  ) {
    this.cookies.set(key.trim(), JSON.stringify(value), this.getSerializeOpts({
      path: '/',
      ...options
    }));
  }

  public get<T>(key: string): T {
    const value = this.cookies.get(key.trim()) ?? 'null';
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  }

  public remove(key: string, options: ICookiesOptions = {}) {
    this.cookies.remove(key.trim(), this.getSerializeOpts({
      path: '/',
      expires: new Date('1970-02-01'),
      ...options
    }));
  }

  public has(key: string) {
    return !!this.get(key);
  }

  public clear() {
    this.keys().forEach((name) => this.remove(name));
  }

  private keys() {
    const _keys = [];
    const cookies = globalThis.document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const key = cookies[i].split('=')[0];
      if (key !== '') _keys.push(key.trim());
    }
    return _keys;
  }

  private getSerializeOpts(options: ICookiesOptions) {
    const { sameSite, maxAge, ...otherOpts } = options;
    const sameSiteOpt = typeof options.sameSite === 'boolean'
      ? (sameSite ? 'strict' : undefined) : sameSite;

    // Convert maxAge to expires for js-cookie compatibility
    const expiresOpt = maxAge !== undefined
      ? new Date(Date.now() + maxAge * 1000)
      : otherOpts.expires;

    return {
      sameSite: sameSiteOpt as ICookies.CookieAttributes['sameSite'],
      expires: expiresOpt,
      ...otherOpts
    };
  }
}

export default CookiesClient;
