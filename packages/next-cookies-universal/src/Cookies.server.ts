/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookies.server.ts */

import type { cookies as ICookies } from 'next/headers';

import type { IServerCookies, ICookiesOptions } from './Cookies.interface';

class CookiesServer implements IServerCookies {
  private cookies: typeof ICookies;

  constructor() {
    this.cookies = require('next/headers').cookies;
  }

  public async set<T = string>(
    key: string,
    value: T,
    options: ICookiesOptions = {}
  ): Promise<void> {
    const cookieStore = await this.cookies();
    cookieStore.set(key.trim(), JSON.stringify(value), {
      path: '/',
      ...options
    });
  }

  public async get<T>(key: string): Promise<T> {
    const cookieStore = await this.cookies();
    const value = cookieStore.get(key.trim())?.value ?? 'null';
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  }

  public async remove(key: string, options: ICookiesOptions = {}): Promise<void> {
    const cookieStore = await this.cookies();
    cookieStore.delete({
      name: key.trim(),
      path: '/',
      expires: new Date('1970-02-01'),
      ...options
    });
  }

  public async has(key: string): Promise<boolean> {
    const cookieStore = await this.cookies();
    return cookieStore.has(key.trim());
  }

  public async clear(): Promise<void> {
    const cookieStore = await this.cookies();
    const allCookies = cookieStore.getAll();
    for (const { name } of allCookies) {
      await this.remove(name);
    }
  }
}

export default CookiesServer;
