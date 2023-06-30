/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookie.ts */

import type { IBaseCookies, ICookiesContext } from './Cookies.interface';

function Cookies(ctx: ICookiesContext = 'server'): IBaseCookies {
  if (ctx === 'client') {
    const CookieClient = require('./Cookies.client').default;
    return new CookieClient();
  }
  const CookieServer = require('./Cookies.server').default;
  return new CookieServer();
}

export type { IBaseCookies, ICookiesContext };

export default Cookies;
