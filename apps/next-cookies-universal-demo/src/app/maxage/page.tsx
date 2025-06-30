import Link from 'next/link';
import Cookies from 'next-cookies-universal';

import { COOKIE_DEMO_KEY } from '@/configs/env';
import MaxAgeForm from './MaxAgeForm';

function MaxAgePage() {
  const cookies = Cookies('server');
  return (
    <div>
      <h1 className="text-center font-bold mt-3">Next Cookies Universal Demo (MaxAge & Expires)</h1>
      <div className="border border-neutral rounded p-5 mt-10">
        <p>Cookie Value: <strong>{cookies.get(COOKIE_DEMO_KEY)}</strong></p>
      </div>
      <MaxAgeForm />
      <Link href="/" className="mt-10 btn btn-accent">
        Homepage
      </Link>
    </div>
  );
}

export default MaxAgePage;
