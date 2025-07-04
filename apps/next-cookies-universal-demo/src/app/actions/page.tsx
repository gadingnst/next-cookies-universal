import Link from 'next/link';
import Cookies from 'next-cookies-universal';

import { COOKIE_DEMO_KEY } from '@/configs/env';
import Form from './Form';

async function ServerActionsPage() {
  const cookies = await Cookies('server');
  const cookieValue = cookies.get<string>(COOKIE_DEMO_KEY);
  return (
    <div>
      <h1 className="text-center font-bold mt-3">Next Cookies Universal Demo (Server Actions)</h1>
      <div className="border border-neutral rounded p-5 mt-10">
        <p>Cookie Value: <strong>{cookieValue || 'Not set'}</strong></p>
      </div>
      <Form />
      <div className="flex flex-col gap-3 mt-10">
        <Link href="/" className="btn btn-accent">
          Homepage
        </Link>
        <Link href="/maxage" className="btn btn-secondary">
          MaxAge Demo (Fixed)
        </Link>
      </div>
    </div>
  );
}

export default ServerActionsPage;
