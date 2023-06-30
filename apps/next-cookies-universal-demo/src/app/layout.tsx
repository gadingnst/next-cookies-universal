import '@/styles/bundle.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import { SITE_NAME } from '@/configs/env';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', adjustFontFallback: false });

/**
 * HTML Metadata in App Route
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields
 */
export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`
  }
} satisfies Metadata;

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <div className="relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl px-3">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
