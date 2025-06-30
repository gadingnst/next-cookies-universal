/**
 * Test file demonstrating the new async/await functionality
 * with proper TypeScript type detection
 */
import Cookies from 'next-cookies-universal';

// Example usage in server context (await only for operations)
export async function serverExample() {
  // No await needed for Cookies('server') - returns IServerCookies directly
  const cookieStore = Cookies('server');

  // All methods return promises and require await
  await cookieStore.set('theme', 'dark', { maxAge: 3600 });
  const theme = await cookieStore.get('theme');
  const hasTheme = await cookieStore.has('theme');
  await cookieStore.remove('theme');
  await cookieStore.clear();

  return { theme, hasTheme };
}

// Example usage in client context (synchronous)
export function clientExample() {
  // No await needed for Cookies('client') - returns IBaseCookies directly
  const cookieStore = Cookies('client');

  // All methods are synchronous, no await needed
  cookieStore.set('theme', 'light', { maxAge: 3600 });
  const theme = cookieStore.get('theme');
  const hasTheme = cookieStore.has('theme');
  cookieStore.remove('theme');
  cookieStore.clear();

  return { theme, hasTheme };
}
