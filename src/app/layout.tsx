import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { HotToastProvider, ThemeProvider } from '@/providers';

import {
  BottomBar,
  LeftSidebar,
  RightSidebar,
  TopBar
} from '@/components/layout';

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

          <ThemeProvider
            themes={['light', 'dark']}
            attribute="class"
            enableSystem
            defaultTheme="system"
          >
            <TopBar />

            <main className="flex min-h-[100svh]">
              <LeftSidebar />

              <section className="flex flex-1 flex-col items-center bg-black px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
                <div className="w-full max-w-4xl">{children}</div>
              </section>

              <RightSidebar />
            </main>

            <BottomBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
