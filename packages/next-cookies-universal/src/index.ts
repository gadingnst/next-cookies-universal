/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookie.ts */

import type { ICookiesContext, IBaseCookies, ICookiesOptions } from './Cookies.interface';
import CookiesClient from './Cookies.client';
import CookiesServer from './Cookies.server';

/**
 * Universal cookies function that works in both client and server contexts
 * @param context - The context in which cookies are being used ('client' or 'server')
 * @returns Promise<IBaseCookies | IServerCookies> - Cookie operations interface
 */
function Cookies(context: ICookiesContext): Promise<IBaseCookies> {
  if (context === 'client') {
    const clientCookies = new CookiesClient();
    return Promise.resolve(clientCookies);
  }

  if (context === 'server') {
    const serverCookies = new CookiesServer();
    return serverCookies.initialize();
  }

  throw new Error(`Invalid context: ${context}. Use 'client' or 'server'.`);
}

export type { IBaseCookies, ICookiesContext, ICookiesOptions };

export default Cookies;
