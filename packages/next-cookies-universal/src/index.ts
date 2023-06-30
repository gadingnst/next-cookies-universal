/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookie.ts */

import type { BaseCookies, CookiesContext } from './Cookies.interface';

function Cookies(ctx: CookiesContext = 'server'): BaseCookies {
  if (ctx === 'client') {
    const CookieClient = require('./Cookies.client').default;
    return new CookieClient();
  }
  const CookieServer = require('./Cookies.server').default;
  return new CookieServer();
}

export type { BaseCookies, CookiesContext };

export default Cookies;
