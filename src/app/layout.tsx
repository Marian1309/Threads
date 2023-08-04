import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import { HotToastProvider, ThemeProvider } from '@/providers';

import './globals.scss';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads - social network',
  authors: [{ name: 'Marian Pidchashyi', url: 'https://github.com/Marian1309' }]
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={figtree.className}>
          <HotToastProvider />

          <ThemeProvider
            themes={['light', 'dark']}
            attribute="class"
            enableSystem
            defaultTheme="system"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
