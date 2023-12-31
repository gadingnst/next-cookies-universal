import Link from 'next/link';
import Cookies from 'next-cookies-universal';

import { COOKIE_DEMO_KEY } from '@/configs/env';
import FormClient from './Form.client';

function HomePage() {
  const cookies = Cookies('server');
  return (
    <div>
      <h1 className="text-center font-bold mt-3">Next Cookies Universal Demo</h1>
      <div className="border border-neutral rounded p-5 mt-10">
        <p>This is a Server component</p>
        <p>Cookie Value: <strong>{cookies.get(COOKIE_DEMO_KEY)}</strong></p>
      </div>
      <FormClient />
      <Link href="/actions" className="mt-10 btn btn-accent">
        Server Action Example
      </Link>
    </div>
  );
}

export default HomePage;
