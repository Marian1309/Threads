'use client';

import {
  BottomBar,
  LeftSidebar,
  RightSidebar,
  TopBar
} from '@/components/layout';

const NotFound = () => {
  return (
    <>
      <TopBar />
      <main className="flex">
        <LeftSidebar />

        <section className="mt-28 flex min-h-screen flex-1 flex-col items-center px-6 pb-10 max-md:pb-32 sm:px-10">
          <div className="w-full max-w-4xl font-bold">Fuck you</div>
        </section>

        <RightSidebar />
      </main>
      <BottomBar />
    </>
  );
};

export default NotFound;
