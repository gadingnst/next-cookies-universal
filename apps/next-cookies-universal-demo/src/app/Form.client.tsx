'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import Cookies from 'next-cookies-universal';
import { COOKIE_DEMO_KEY } from '@/configs/env';

function FormClient() {
  const cookies = Cookies('client');
  const [cookieVal, setCookieVal] = useState('');

  const router = useRouter();

  const saveToCookies = useCallback(() => {
    if (!cookieVal) {
      window.alert('Value should not be empty!');
      return;
    }
    cookies.set(COOKIE_DEMO_KEY, cookieVal);
    setCookieVal('');
    router.refresh();
  }, [cookieVal]);

  const clearCookies = useCallback(() => {
    cookies.clear();
    router.refresh();
  }, []);

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
      <div className="flex items-center space-x-3">
        <button disabled={!cookieVal} onClick={saveToCookies} className="btn btn-primary block mt-3">
          Set Your cookies from client
        </button>
        <button onClick={clearCookies} className="btn btn-neutral block mt-3">
          Clear
        </button>
      </div>
    </div>
  );
}

export default FormClient;
