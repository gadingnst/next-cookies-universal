# 🍪 Cookies Universal for NextJS App Route

[![npm](https://img.shields.io/npm/v/next-cookies-universal.svg)](https://www.npmjs.com/package/next-cookies-universal)
[![npm](https://img.shields.io/npm/dt/next-cookies-universal.svg)](https://npm-stat.com/charts.html?package=next-cookies-universal)
[![GitHub issues](https://img.shields.io/github/issues/gadingnst/next-cookies-universal.svg)](https://github.com/gadingnst/next-cookies-universal/issues)

An utility that can help you to handle the Cookies in [NextJS App Route](https://nextjs.org/docs/app/building-your-application) with every context *(both Server or Client)* 🍪🔥

All supported to NextJS App Route
- ✅ Server Component and Server Actions [Based on next/headers cookies](https://nextjs.org/docs/app/api-reference/functions/cookies)
- ✅ Client Component [Based on js-cookie](https://www.npmjs.com/package/js-cookie)

# Table of Contents
- [🍪 Cookies Universal for NextJS App Route](#-cookies-universal-for-nextjs-app-route)
- [Table of Contents](#table-of-contents)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
  - [Install](#install)
    - [NPM](#npm)
    - [Yarn](#yarn)
  - [Usage](#usage)
    - [Initialize](#initialize)
    - [Client Component](#client-component)
    - [Server Component](#server-component)
    - [Server Actions](#server-actions)
      - [With Server Component](#with-server-component)
      - [With Client Component](#with-client-component)
- [Cookie Options](#cookie-options)
  - [Setting Cookies with Expiration](#setting-cookies-with-expiration)
  - [Server Actions with Cookie Options](#server-actions-with-cookie-options)
  - [Important Notes](#important-notes)
- [API Reference](#api-reference)
- [Publishing](#publishing)
- [License](#license)
- [Feedbacks and Issues](#feedbacks-and-issues)
- [Support](#support)
  - [Global](#global)
  - [Indonesia](#indonesia)

# Live Demo
You can see Live Demo [here](https://next-cookies-universal-demo.gading.dev)

# Getting Started
## Install
### NPM
```bash
npm i next-cookies-universal
```
### Yarn
```bash
yarn add next-cookies-universal
```

## Usage
### Initialize
```js
import Cookies from 'next-cookies-universal';


const ServerCookies = Cookies('server');
// or
const ClientCookies = Cookies('client');
```

### Client Component
```jsx
'use client';

import Cookies from 'next-cookies-universal';


const MyClientComponent = () => {
  const cookies = Cookies('client');

  const handleClick = () => {
    cookies.set('my_token', 'my_token_value');
  };

  const handleClickWithExpiry = () => {
    // Set cookie with maxAge (expires in 1 hour)
    cookies.set('my_token', 'my_token_value', {
      maxAge: 60 * 60, // 1 hour in seconds
      path: '/'
    });
  };

  const handleClickWithExpiresDate = () => {
    // Set cookie with specific expiration date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now
    cookies.set('my_token', 'my_token_value', {
      expires: expiryDate,
      path: '/'
    });
  };

  return (
    <div>
      <button onClick={handleClick}>
        Click to set cookies
      </button>
      <button onClick={handleClickWithExpiry}>
        Click to set cookies with maxAge
      </button>
      <button onClick={handleClickWithExpiresDate}>
        Click to set cookies with expires date
      </button>
    </div>
  );
};
```

### Server Component
```jsx
import Cookies from 'next-cookies-universal';


const MyServerComponent = async() => {
  const cookies = Cookies('server');
  const myToken = cookies.get('my_token');

  const data = await fetch('http://your.endpoint', {
    headers: {
      Authentication: `Bearer ${myToken}`
    }
  }).then(response => response.json());

  return (
    <div>
      <p>Cookies Value: <strong>{myToken}</strong></p>
      <code>
        {JSON.stringify(data)}
      </code>
    </div>
  );
};
```

> Note: if you want to set cookies in Server, you not to allowed to set it on Server Component, you should do that in Server Actions.

```jsx
import Cookies from 'next-cookies-universal';


const MyServerComponent = async() => {
  const cookies = Cookies('server');

  /** you should not to do like this!
   * please read Server Actions reference if you want to set the cookies through Server.
   */
  cookies.set('my_token', 'my_token_value');

  const myToken = cookies.get('my_token');

  return (
    <div>
      <p>Cookies Value: <strong>{myToken}</strong></p>
      <code>
        {JSON.stringify(data)}
      </code>
    </div>
  );
};
```

### Server Actions
#### With Server Component
```tsx
import Cookies from 'next-cookies-universal';

async function setFromAction(formData: FormData) {
  'use server';

  const cookies = Cookies('server');
  cookies.set('my_token', formData.get('cookie-value'));
}

function Form() {
  return (
    <div>
      <form action={setFromAction}>
        <input type="text" name="cookie-value" />
        <div>
          <button type="submit">
            Set Your cookies
          </button>
        </div>
      </form>
    </div>
  );
}
```
#### With Client Component
```ts
/** action.ts */
'use server';

export async function setFromAction(formData: FormData) {
  const cookies = Cookies('server');
  cookies.set('my_token', formData.get('cookie-value'));
}
```

```tsx
/** Form.tsx */
'use client';
import { setFromAction } from './action.ts';

function Form() {
  /** client logic */
  return (
    <div>
      <form action={setFromAction}>
        <input type="text" name="cookie-value" />
        <div>
          <button type="submit">
            Set Your cookies
          </button>
        </div>
      </form>
    </div>
  );
}
```

## Cookie Options

### Setting Cookies with Expiration

You can set cookies with various expiration options using the `options` parameter:

```jsx
'use client';

import Cookies from 'next-cookies-universal';

const cookies = Cookies('client');

// Set cookie that expires in 1 hour using maxAge
cookies.set('session_token', 'abc123', {
  maxAge: 60 * 60, // 1 hour in seconds
  path: '/'
});

// Set cookie that expires in 1 day using expires Date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
cookies.set('user_preference', 'dark_mode', {
  expires: tomorrow, // expires tomorrow
  path: '/',
  secure: true,
  sameSite: 'strict'
});

// Set cookie that expires in 1 year using maxAge
cookies.set('remember_me', 'true', {
  maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
  path: '/'
});

// Set cookie with specific expiration date
const specificDate = new Date('2024-12-31T23:59:59Z');
cookies.set('campaign_banner', 'hidden', {
  expires: specificDate, // expires on specific date
  path: '/'
});
```

### Server Actions with Cookie Options

```tsx
import Cookies from 'next-cookies-universal';

async function setTokenWithExpiry(formData: FormData) {
  'use server';

  const cookies = Cookies('server');
  const token = formData.get('token');

  // Set cookie with 7 days expiration using maxAge
  cookies.set('auth_token', token, {
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  // Set cookie with specific expiration date using expires
  const sessionExpiry = new Date();
  sessionExpiry.setHours(sessionExpiry.getHours() + 2); // 2 hours from now
  cookies.set('session_id', 'session_123', {
    expires: sessionExpiry,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
}
```

### Important Notes

- **maxAge**: Specifies the cookie expiration time in seconds (relative to current time)
- **expires**: Specifies the exact date and time when the cookie should expire (absolute time)
- **Client-side**:
  - The `maxAge` option is automatically converted to an `expires` Date object for compatibility with `js-cookie`
  - The `expires` option accepts a Date object directly
- **Server-side**: Uses Next.js built-in cookie handling which supports both `maxAge` and `expires` directly
- **Choosing between maxAge and expires**:
  - Use `maxAge` for relative expiration (e.g., "expire in 1 hour")
  - Use `expires` for absolute expiration (e.g., "expire on December 31st")
- **Security**: Always use `secure: true` and appropriate `sameSite` settings in production

# API Reference

```ts
/** parameter to initialize the Cookies() */
export type ICookiesContext = 'server'|'client';

/** both Cookies('client') and Cookies('server') implements this interface */
export interface IBaseCookies {
  set<T = string>(
    key: string,
    value: T,
    options?: ICookiesOptions
  ): void;

  get<T = string>(key: string): T;

  remove(key: string, options?: ICookiesOptions): void;

  has(key: string): boolean;

  clear(): void;
}
```

for `ICookiesOptions` API, we use `CookieSerializeOptions` from [DefinetlyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cookie/index.d.ts#L14)

# Publishing
- Before pushing your changes to Github, make sure that `version` in `package.json` is changed to newest version. Then run `npm install` for synchronize it to `package-lock.json`
- After your changes have been merged on branch `main`, you can publish the packages by creating new Relase here: https://github.com/gadingnst/next-cookies-universal/releases/new
- Create new `tag`, make sure the `tag` name is same as the `version` in `package.json`.
- You can write Release title and notes here. Or you can use auto-generated release title and notes.
- Click `Publish Release` button, then wait the package to be published.

# License
`next-cookies-universal` is freely distributable under the terms of the [MIT license](https://github.com/gadingnst/next-cookies-universal/blob/master/LICENSE).

# Feedbacks and Issues
Feel free to open issues if you found any feedback or issues on `next-cookies-universal`. And feel free if you want to contribute too! 😄

# Support
## Global
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/gadingnst)
## Indonesia
- [Trakteer](https://trakteer.id/gadingnst)
- [Karyakarsa](https://karyakarsa.com/gadingnst)

---

Built with ❤️ by [Sutan Gading Fadhillah Nasution](https://github.com/gadingnst) on 2023
