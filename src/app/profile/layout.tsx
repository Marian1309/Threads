import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';

import { BottomBar, TopBar } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Profile'
};

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-[97.5svh] flex-center">
      <TopBar />
      {children}
      <BottomBar />
    </div>
  );
};

export default ProfileLayout;
