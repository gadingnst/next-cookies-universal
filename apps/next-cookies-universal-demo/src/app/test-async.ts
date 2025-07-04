/**
 * Test file demonstrating the new async/await functionality
 * with proper TypeScript type detection
 */
import Cookies from 'next-cookies-universal';

// Example usage in server context (await for initialization only)
export async function serverExample() {
  // Await needed for Cookies('server') initialization
  const cookieStore = await Cookies('server');

  // All methods are now synchronous after initialization
  cookieStore.set('theme', 'dark', { maxAge: 3600 });
  const theme = cookieStore.get('theme');
  const hasTheme = cookieStore.has('theme');
  cookieStore.remove('theme');
  cookieStore.clear();

  return { theme, hasTheme };
}

// Example usage in client context (await for initialization only)
export async function clientExample() {
  // Await needed for Cookies('client') initialization
  const cookieStore = await Cookies('client');

  // All methods are synchronous after initialization
  cookieStore.set('theme', 'light', { maxAge: 3600 });
  const theme = cookieStore.get('theme');
  const hasTheme = cookieStore.has('theme');
  cookieStore.remove('theme');
  cookieStore.clear();

  return { theme, hasTheme };
}
