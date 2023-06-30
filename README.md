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
import Cookies from 'next-universal-cookies';

const ServerCookies = Cookies('server');
// or
const ClientCookies = Cookies('client');
```

### Client Component
```jsx
'use client';

import Cookies from 'next-universal-cookies';

const MyClientComponent = () => {
  const cookies = Cookies('client');

  const handleClick = () => {
    cookies.set('my_token', 'my_token_value');
  };

  return (
    <button onClick={handleClick}>
      Click to set cookies
    </button>
  );
};
```

### Server Component
```jsx
import Cookies from 'next-universal-cookies';

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
import Cookies from 'next-universal-cookies';

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

# API Reference

```ts
import type { CookieSerializeOptions } from 'cookie';

/** parameter to initialize the Cookies() */
export type ICookiesContext = 'server'|'client';

/** both Cookies('client') and Cookies('server') implements this interface */
export interface IBaseCookies {
  set<T = string>(
    key: string,
    value: T,
    options?: CookieSerializeOptions
  ): void;

  get<T = string>(key: string): T;

  remove(key: string, options?: CookieSerializeOptions): void;

  has(key: string): boolean;

  clear(): void;
}
```

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
