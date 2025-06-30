/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookie.ts */

import type { IBaseCookies, IServerCookies, ICookiesContext, ICookiesOptions } from './Cookies.interface';

/**
 * Creates a cookies instance for server or client context
 * @param ctx - The context ('server' or 'client')
 * @returns IServerCookies for server context, IBaseCookies for client context
 */
function Cookies(ctx: 'server'): IServerCookies;
function Cookies(ctx: 'client'): IBaseCookies;
function Cookies(ctx: ICookiesContext = 'server'): IServerCookies | IBaseCookies {
  if (ctx === 'client') {
    const CookieClient = require('./Cookies.client').default;
    return new CookieClient();
  }
  const CookieServer = require('./Cookies.server').default;
  return new CookieServer();
}

export type { IBaseCookies, IServerCookies, ICookiesContext, ICookiesOptions };

export default Cookies;
