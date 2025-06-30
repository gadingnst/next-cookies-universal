import Cookies from 'next-cookies-universal';
import { COOKIE_DEMO_KEY } from '@/configs/env';

async function setFromAction(formData: FormData) {
  'use server';

  const cookies = Cookies('server');
  await cookies.set(COOKIE_DEMO_KEY, formData.get('cookie-value'));
}

function FormClient() {
  return (
    <div className="border border-neutral rounded p-5 mt-10">
      <form action={setFromAction}>
        <input
          type="text"
          placeholder="Insert you cookie value"
          className="input input-bordered input-primary w-full max-w-xs block mt-3"
          name="cookie-value"
        />
        <div className="flex items-center space-x-3">
          <button type="submit" className="btn btn-primary mt-3 w-full">
            Set Your cookies from server actions
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormClient;
