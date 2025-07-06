/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookie.ts */

import type { ICookiesContext, IBaseCookies, ICookiesOptions } from './Cookies.interface';
import BaseCookiesClient from './Cookies.client';
import BaseCookiesServer from './Cookies.server';

/**
 * Universal cookies function that works in both client and server contexts
 * @param context - The context in which cookies are being used ('client' or 'server')
 * @returns Promise<IBaseCookies | IServerCookies> - Cookie operations interface
 */
function Cookies(context: ICookiesContext): Promise<IBaseCookies> {
  if (context === 'client') {
    const clientCookies = new BaseCookiesClient();
    return Promise.resolve(clientCookies);
  }

  if (context === 'server') {
    const serverCookies = new BaseCookiesServer();
    return serverCookies.initialize();
  }

  throw new Error(`Invalid context: ${context}. Use 'client' or 'server'.`);
}

export function CookiesClient(): IBaseCookies {
  return new BaseCookiesClient();
}

export function CookiesServer(): Promise<IBaseCookies> {
  const serverCookies = new BaseCookiesServer();
  return serverCookies.initialize();
}

export type { IBaseCookies, ICookiesContext, ICookiesOptions };

export default Cookies;
