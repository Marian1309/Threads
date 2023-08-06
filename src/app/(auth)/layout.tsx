import type { FC, ReactNode } from 'react';

import { BottomBar, TopBar } from '@/components/layout';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-[100svh] flex-center">
      <TopBar />
      {children}
      <BottomBar />
    </div>
  );
};

export default AuthLayout;
