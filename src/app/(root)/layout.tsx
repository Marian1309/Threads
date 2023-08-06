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

      <main className="flex min-h-[100svh] overflow-y-hidden">
        <LeftSidebar />

        <section className="flex flex-1 flex-col items-center px-6 max-md:pb-32 sm:px-10">
          <div className="w-full max-w-2xl lg:max-w-4xl">{children}</div>
        </section>

        <RightSidebar />
      </main>

      <BottomBar />
    </>
  );
};

export default RootLayout;
