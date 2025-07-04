'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Cookies from 'next-cookies-universal';
import { COOKIE_DEMO_KEY } from '@/configs/env';

function FormClient() {
  const [cookies, setCookies] = useState<any>(null);
  const [cookieVal, setCookieVal] = useState('');

  const router = useRouter();

  useEffect(() => {
    const initCookies = async() => {
      const cookieInstance = await Cookies('client');
      setCookies(cookieInstance);
    };
    initCookies();
  }, []);

  const saveToCookies = useCallback(() => {
    if (!cookies) return;
    if (!cookieVal) {
      window.alert('Value should not be empty!');
      return;
    }
    cookies.set(COOKIE_DEMO_KEY, cookieVal);
    setCookieVal('');
    router.refresh();
  }, [cookieVal]);

  const clearCookies = useCallback(() => {
    if (!cookies) return;
    cookies.clear();
    router.refresh();
  }, [cookies, router]);

  return (
    <div className="border border-neutral rounded p-5 mt-10">
      <p>This is a Client Component</p>
      <input
        type="text"
        placeholder="Insert you cookie value"
        className="input input-bordered input-primary w-full max-w-xs block mt-3"
        value={cookieVal}
        onChange={(e) => setCookieVal(e.target.value)}
      />
      <div className="flex items-center flex-col sm:flex-row space-x-3">
        <button disabled={!cookieVal || !cookies} onClick={saveToCookies} className="btn btn-primary block mt-3">
          Set Your cookies from client
        </button>
        <button onClick={clearCookies} disabled={!cookies} className="btn btn-neutral block mt-3">
          Clear
        </button>
      </div>
    </div>
  );
}

export default FormClient;
