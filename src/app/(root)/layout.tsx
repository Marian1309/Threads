import type { FC, ReactNode } from 'react';

import {
  BottomBar,
  LeftSidebar,
  RightSidebar,
  TopBar
} from '@/components/layout';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <TopBar />

      <main className="flex">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col items-center bg-black px-4 pb-10 max-md:pb-32 sm:px-6">
          <div className="w-full max-w-4xl">{children}</div>
        </section>

        <RightSidebar />
      </main>

      <BottomBar />
    </>
  );
};

export default RootLayout;
