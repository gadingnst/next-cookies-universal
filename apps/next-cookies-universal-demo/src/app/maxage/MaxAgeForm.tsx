'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Cookies from 'next-cookies-universal';
import { COOKIE_DEMO_KEY } from '@/configs/env';

/**
 * Form component demonstrating maxAge and expires functionality
 */
function MaxAgeForm() {
  const [cookies, setCookies] = useState<any>(null);
  const [cookieVal, setCookieVal] = useState('');
  const [selectedMaxAge, setSelectedMaxAge] = useState(60); // Default 1 minute
  const [selectedExpires, setSelectedExpires] = useState('1hour'); // Default 1 hour
  const [expirationMode, setExpirationMode] = useState<'maxAge' | 'expires'>('maxAge');

  const router = useRouter();

  useEffect(() => {
    const initCookies = async() => {
      const cookieInstance = await Cookies('client');
      setCookies(cookieInstance);
    };
    initCookies();
  }, []);

  /**
   * Save cookie with specified maxAge
   */
  const saveToCookies = useCallback((maxAge: number) => {
    if (!cookies) return;
    if (!cookieVal) {
      window.alert('Value should not be empty!');
      return;
    }

    cookies.set(COOKIE_DEMO_KEY, cookieVal, {
      maxAge: maxAge, // maxAge in seconds
      path: '/'
    });

    setCookieVal('');
    router.refresh();

    const timeLabel = getTimeLabel(maxAge);
    window.alert(`Cookie set with maxAge: ${timeLabel}`);
  }, [cookieVal, cookies, router]);

  /**
   * Save cookie with specified expires date
   */
  const saveToCookiesWithExpires = useCallback((expiresKey: string) => {
    if (!cookies) return;
    if (!cookieVal) {
      window.alert('Value should not be empty!');
      return;
    }

    const expiresDate = getExpiresDate(expiresKey);

    cookies.set(COOKIE_DEMO_KEY, cookieVal, {
      expires: expiresDate,
      path: '/'
    });

    setCookieVal('');
    router.refresh();

    const timeLabel = getExpiresLabel(expiresKey);
    window.alert(`Cookie set with expires: ${timeLabel}`);
  }, [cookieVal, cookies, router]);

  /**
   * Clear all cookies
   */
  const clearCookies = useCallback(() => {
    if (!cookies) return;
    cookies.clear();
    router.refresh();
  }, [cookies, router]);

  /**
   * Get human readable time label for maxAge
   */
  const getTimeLabel = (seconds: number): string => {
    if (seconds === 60) return '1 minute';
    if (seconds === 3600) return '1 hour';
    if (seconds === 86400) return '1 day';
    if (seconds === 31536000) return '1 year';
    return `${seconds} seconds`;
  };

  /**
   * Get expires date based on key
   */
  const getExpiresDate = (key: string): Date => {
    const now = new Date();
    switch (key) {
      case '1hour':
        return new Date(now.getTime() + 60 * 60 * 1000);
      case '1day':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case '1week':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'endOfYear':
        return new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      default:
        return new Date(now.getTime() + 60 * 60 * 1000); // Default 1 hour
    }
  };

  /**
   * Get human readable label for expires
   */
  const getExpiresLabel = (key: string): string => {
    switch (key) {
      case '1hour':
        return '1 hour from now';
      case '1day':
        return '1 day from now';
      case '1week':
        return '1 week from now';
      case 'endOfYear':
        return 'end of current year';
      default:
        return '1 hour from now';
    }
  };

  const maxAgeOptions = [
    { value: 60, label: '1 minute' },
    { value: 3600, label: '1 hour' },
    { value: 86400, label: '1 day' },
    { value: 31536000, label: '1 year' }
  ];

  const expiresOptions = [
    { value: '1hour', label: '1 hour from now' },
    { value: '1day', label: '1 day from now' },
    { value: '1week', label: '1 week from now' },
    { value: 'endOfYear', label: 'End of current year' }
  ];

  return (
    <div className="border border-neutral rounded p-5 mt-10">
      <p className="font-semibold mb-4">Test MaxAge & Expires Functionality (Client Component)</p>

      <input
        type="text"
        placeholder="Insert your cookie value"
        className="input input-bordered input-primary w-full max-w-xs block mt-3"
        value={cookieVal}
        onChange={(e) => setCookieVal(e.target.value)}
      />

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Expiration Mode:</label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="expirationMode"
              value="maxAge"
              checked={expirationMode === 'maxAge'}
              onChange={(e) => setExpirationMode(e.target.value as 'maxAge' | 'expires')}
              className="radio radio-primary mr-2"
            />
            MaxAge (relative seconds)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="expirationMode"
              value="expires"
              checked={expirationMode === 'expires'}
              onChange={(e) => setExpirationMode(e.target.value as 'maxAge' | 'expires')}
              className="radio radio-primary mr-2"
            />
            Expires (absolute date)
          </label>
        </div>
      </div>

      {expirationMode === 'maxAge' ? (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Select MaxAge:</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedMaxAge}
            onChange={(e) => setSelectedMaxAge(Number(e.target.value))}
          >
            {maxAgeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value}s)
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Select Expires:</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedExpires}
            onChange={(e) => setSelectedExpires(e.target.value)}
          >
            {expiresOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center flex-col sm:flex-row gap-3 mt-4">
        <button
          disabled={!cookieVal || !cookies}
          onClick={() => {
            if (expirationMode === 'maxAge') {
              saveToCookies(selectedMaxAge);
            } else {
              saveToCookiesWithExpires(selectedExpires);
            }
          }}
          className="btn btn-primary"
        >
          {expirationMode === 'maxAge' ? 'Set Cookie with MaxAge' : 'Set Cookie with Expires'}
        </button>

        <button onClick={clearCookies} disabled={!cookies} className="btn btn-neutral">
          Clear All Cookies
        </button>
      </div>

      <div className="mt-4 p-3 bg-base-200 rounded">
        <p className="text-sm">
          <strong>Note:</strong> This demo showcases both cookie expiration options:
        </p>
        <ul className="text-sm mt-2 ml-4 list-disc">
          <li><strong>MaxAge:</strong> Sets expiration in seconds (relative time from now)</li>
          <li><strong>Expires:</strong> Sets expiration to a specific date/time (absolute time)</li>
        </ul>
        <p className="text-sm mt-2">
          Both options demonstrate the fix for cookie serialization compatibility with js-cookie.
        </p>
      </div>
    </div>
  );
}

export default MaxAgeForm;
