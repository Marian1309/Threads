import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import HotToastProvider from '@/providers/hot-toast';

import './globals.scss';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads - social network',
  authors: [{ name: 'Marian Pidchashyi', url: 'https://github.com/Marian1309' }]
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={figtree.className}>
          <HotToastProvider />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
