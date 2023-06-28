/* eslint-disable @typescript-eslint/no-var-requires */
/** Cookie.ts */
// import ICookieServer from './Cookies.server';
// import ICookieClient from './Cookies.client';
import type { BaseCookies, CookiesContext } from './Cookies.interface';

function Cookies(ctx: CookiesContext = 'server'): BaseCookies {
  if (ctx === 'client') {
    const CookieClient = require('./Cookie.client').default;
    // const CookieClient = ICookieClient;
    return new CookieClient();
  }
  const CookieServer = require('./Cookie.server').default;
  // const CookieServer = ICookieServer;
  return new CookieServer();
}

export type { BaseCookies, CookiesContext };

export default Cookies;
